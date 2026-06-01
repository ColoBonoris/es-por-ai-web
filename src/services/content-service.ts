import { homePageData } from "@/mocks/home-data";
import type { Highlight, HomePageData } from "@/types/home";

const MOCK_DELAY_MS = 150;

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export async function getHomePageData(): Promise<HomePageData> {
  await wait(MOCK_DELAY_MS);
  return homePageData;
}

export async function getDashboardHighlights(): Promise<Highlight[]> {
  await wait(MOCK_DELAY_MS);
  return homePageData.highlights;
}
