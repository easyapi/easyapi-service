<template>
  <div class="stat">
    <div class="title">
      <span>接口统计</span>
    </div>
    <div class="Choice">
      <Select
        v-model="serviceId"
        placeholder="请选择服务"
        class="state"
        @on-change="switchingService()"
      >
        <Option
          v-for="(service, serviceIndex) in serviceList"
          :value="service.value"
          :key="serviceIndex"
        >{{ service.label }}
        </Option
        >
      </Select>
      <Row class="date">
        <Col span="12">
          <DatePicker
            @on-change="selectionDate('选择天数', timeAndDate)"
            v-model="timeAndDate"
            format="yyyy-MM-dd"
            type="daterange"
            placement="bottom-end"
            placeholder="请选择开始时间，结束时间"
            style="width: 200px"
          ></DatePicker>
        </Col>
      </Row>
      <div class="item">
        <span
          :class="{ selection: Switching === '最近7天' }"
          @click="stand('最近7天', 7)"
        >最近7天</span
        >
        <span
          :class="{ selection: Switching === '最近30天' }"
          @click="stand('最近30天', 30)"
        >最近30天</span
        >
      </div>
    </div>
    <div class="statistics_conter">
      <div class="Statistical">
        <h6 class="frequency">请求次数</h6>
        <stat-chart ref="child" id="highcharts" class="high" :option="option"></stat-chart>
      </div>
    </div>
  </div>
</template>
<script>
  // 导入chart组件
  let chart = {};
  import StatChart from "../components/chart/stat";
  import { getServiceEveryday } from "../api/api";
  import { getUserServiceList } from "../api/user-service";
  import moment from "moment";

  export default {
    data() {
      return {
        serviceId: "",
        serviceList: "",
        Switching: "最近7天",
        timeAndDate: "",
        startDay: "", //开始时间
        endDay: "", //截止时间
        dayArr: [],

        item: 7,
        option: {},
        data: [
          {
            name: "",
            data: []
          }
        ],
        other: {
          title: {
            //标题
            text: ""
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },
          xAxis: {
            categories: [],
            crosshair: true
          },
          yAxis: {
            title: {
              text: ""
            }
          },
          series: "",
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          },
          credits: {
            enabled: false // 去掉highcharts商标
          }
        }
      };
    },
    methods: {
      stand(pay, data) {
        this.dayArr = [];
        this.timeAndDate = "";
        this.Switching = pay;
        this.item = data;
        this.getItem();
      },
      getItem() {
        for (let i = 0; i < this.item; i++) {
          const ymd = moment(new Date().getTime() - 24 * 60 * 60 * 1000 * i).format("YYYY-MM-DD");
          this.dayArr.unshift(ymd);
        }
        this.startDay = this.dayArr[0];
        let index = this.dayArr.length - 1;
        this.endDay = this.dayArr[index];
        this.timeAndDate = [this.dayArr[0].split(" ")[0], this.dayArr[index].split(" ")[0]];
        this.getTimeAndDate();
      },
      //选择时间
      selectionDate(style, par) {
        this.Switching = style;
        this.startDay = moment(par[0]).format("YYYY-MM-DD");
        this.endDay = moment(par[1]).format("YYYY-MM-DD");
        this.getTimeAndDate();
      },
      //接口统计
      getTimeAndDate() {
        let params = {
          serviceId: this.serviceId,
          startDay: this.startDay + " 00:00:00",
          endDay: this.endDay + " 23:59:59",
          size: 500
        };
        getServiceEveryday(params).then(res => {
          if (res.data.code === 1) {
            let data = [];
            let timeArr = [];
            for (let item of res.data.content) {
              timeArr.push(item.day.split(" ")[0]);
              data.push(item.count);
            }
            this.data[0].data = data;
            this.other.xAxis.categories = timeArr;
            chart.other.series = chart.data; //数据
            chart.option = chart.other;
            this.$refs.child.getHighCharts();
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //我的服务
      getUserService() {
        let params = {
          serviceCategory: this.serviceCategory,
          size: 50
        };
        getUserServiceList(params).then(res => {
          if (res.data.code === 1) {
            this.serviceList = [];
            for (let item of res.data.content) {
              this.serviceList.push({
                value: item.service.serviceId,
                label: item.service.name
              });
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //切换服务
      switchingService() {
        this.getTimeAndDate();
      }
    },
    beforeCreate: function() {
      chart = this;
    },
    mounted: function() {
      this.serviceId = Number(this.$route.query.serviceId);
      this.getItem();
      this.getUserService();
    },
    components: {
      StatChart
    }
  };
</script>
<style>
  .highcharts-axis {
    display: none;
  }

  .highcharts-legend-item {
    display: none;
  }
</style>
<style scoped>
  .stat {
    width: 100%;
    height: auto;
  }

  .title {
    width: 100%;
    height: 80px;
    background-color: #fafafa;
  }

  .title span {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    color: #000000;
  }

  .Choice {
    width: 1200px;
    height: 106px;
    margin: 0 auto;
    display: flex;
  }

  .state {
    width: 200px;
    padding-top: 38px;
  }

  .date {
    display: flex;
    padding-left: 20px;
    line-height: 106px;
  }

  .statistics_conter {
    width: 100%;
    height: auto;
  }

  .Statistical {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    background-color: #ffffff;
    border: solid 1px #dddddd;
  }

  .frequency {
    display: block;
    margin-top: 20px;
    padding-left: 38px;
    padding-bottom: 10px;
    color: #333333;
    font-size: 14px;
  }

  .item {
    display: flex;
  }

  .item span {
    width: 80px;
    height: 27px;
    margin-top: 42px;
    font-size: 14px;
    margin-left: 20px;
    cursor: pointer;
    text-align: center;
  }

  .selection {
    line-height: 27px;
    text-align: center;
    background-color: #1bc1d6;
    border-radius: 14px;
    margin-left: 20px;
    color: #ffffff;
    margin-top: 38px !important;
  }
</style>
