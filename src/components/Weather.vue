<template>
  <div class="weather">
    <div class="weather__current">
      <img src="../assets/sun.svg" alt="" />
      <div class="weather__current__info">
        <h3 class="location">{{ location }}</h3>
        <h4 class="temp">{{ current.temp + "º" }}</h4>
        <h5 class="humidity">Humidity: {{ current.humidity + "%" }}</h5>
        <h5 class="uvi">UVI: {{ current.uvi + "º" }}</h5>
        <h5 class="wind">
          Wind: {{ direction() + " " + current.wind_speed + "Kmh" }}
        </h5>
      </div>
    </div>
    <div class="weather__forecast">
      <div
        class="weather__forecast__item"
        v-for="(item, idx) in forecast"
        :key="idx"
      >
        <h5 class="day">{{ idx === 0 ? "Today" : getDay(idx) }}</h5>
        <img :src="getIcon(item.weather[0].main)" alt="" />
        <h6 class="max-temp">{{ item.temp.max + "ºC" }}</h6>
        <h6 class="min-temp">{{ item.temp.min + "ºC" }}</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Report {
  timezone: string;
  current: {
    humidity: number;
    uvi: number;
    temp: number;
    // eslint-disable-next-line
    wind_speed: number;
    // eslint-disable-next-line
    wind_deg: number;
  };
  daily: [
    {
      weather: [];
      temp: {
        min: number;
        max: number;
      };
    }
  ];
}

interface Props {
  report: Report;
}

export default defineComponent({
  name: "Weather",
  props: {
    report: {
      type: Object as () => Report,
      required: true
    }
  },
  setup(props: Props) {
    const location = ref(props.report.timezone);
    const current = ref(props.report.current);
    const forecast = props.report.daily.slice(0, 6);

    function direction(): string {
      const deg = current.value.wind_deg;
      if (deg === 0 || deg === 360) {
        return "N";
      } else if (deg > 0 && deg < 90) {
        return "NE";
      } else if (deg === 90) {
        return "E";
      } else if (deg > 90 && deg < 180) {
        return "SE";
      } else if (deg === 180) {
        return "S";
      } else if (deg > 180 && deg < 270) {
        return "SW";
      } else if (deg > 270 && deg < 360) {
        return "NW";
      } else {
        return "";
      }
    }

    function getIcon(type: string) {
      switch (type) {
        case "Clear":
          return require("../assets/cloud-clear.svg");
        case "Rain":
          return require("../assets/rainy.svg");
        case "Clouds":
          return require("../assets/cloud-sun.svg");
        default:
          return require("../assets/cloud-clear.svg");
      }
    }

    function getDay(next: number): string {
      const date = new Date();
      const dayID = new Date(date.setDate(date.getDate() + next)).getDay();
      switch (dayID) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        default:
          return "";
      }
    }

    return {
      location,
      current,
      forecast,
      direction,
      getIcon,
      getDay
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.weather {
  background: linear-gradient(
      180deg,
      #0668c2 0%,
      #1c0168 100%,
      rgba(68, 12, 158, 0) 100%
    ),
    #c4c4c4;
  color: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px 40px;
  max-width: 900px;

  &__current {
    display: flex;

    img {
      width: 117px;
      margin-right: 20px;
    }

    &__info {
      .location {
        font-size: 25px;
      }
      .temp {
        font-size: 20px;
      }
      .humidity,
      .uvi,
      .wind {
        font-size: 15px;
      }
    }
  }

  &__forecast {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 20px;

    @media screen and (max-width: 480px) {
      margin-top: 50px;
      grid-template-columns: auto;

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h5.day {
          min-width: 70px;
          text-align: left;
        }
      }
    }

    &__item {
      text-align: center;

      .day {
        font-size: 15px;
      }
      img {
        width: 50px;
        height: 60px;
        margin: 5px 0;
      }
      .min-temp {
        color: #00ffff;
        font-size: 12px;
      }
      .max-temp {
        color: #ff0000;
        font-size: 12px;
      }
    }
  }
}
</style>
