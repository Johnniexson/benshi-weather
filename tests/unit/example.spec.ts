import { shallowMount } from "@vue/test-utils";
import Weather from "@/components/Weather.vue";

describe("Weather.vue", () => {
  it("renders props.report when passed", () => {
    const report = { timezone: "Europe/Madrid" };
    const wrapper = shallowMount(Weather, {
      props: { report }
    });
    expect(wrapper.find(".location").text()).toEqual(report.timezone);
  });
});
