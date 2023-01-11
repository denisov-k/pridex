const options = {
  tooltip: {
    extraCssText: "display: flex; flex-direction: column;white-space:nowrap; max-width:40vw; font-size: 1rem; padding: 0.5rem;",
    /*formatter: function (params) {
      return `
        <b style="margin-bottom: 0.5rem;">${params[0].axisValueLabel}</b>
        <p style="margin: 0 0 0.5rem;">${params[0].marker} ${params[0].seriesName}:
        <span style="border: 0.1rem dashed #737373;border-radius: 0.3rem;padding: 0 0.2rem;font-size: 0.8rem;">${params[0].value}</span></p>
        <p style="margin: 0;">${params[1].marker} ${params[1].seriesName}:
        <span style="border: 0.1rem dashed #737373;border-radius: 0.3rem;padding: 0 0.2rem;font-size: 0.8rem;">${params[1].value}</span></p>
        `
    },*/
    confine: true,
    trigger: 'axis'
  },
  legend: {
    type: 'scroll',
    //data: ['Rainfall', 'Evaporation'],
      padding: [0, 25],
    bottom: '2%',
    textStyle: {
      fontSize: '1rem',
      color: '#737373'
    },
    orient: "horizontal"
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      // prettier-ignore
      data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      axisLabel: {
        fontSize: '1rem',
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        fontSize: '1rem',
      }
    }
  ],
  grid: {
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '12.5%',
    containLabel: true,
  },
};

export default options;