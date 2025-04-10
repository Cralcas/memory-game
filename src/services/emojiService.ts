import { IEmoji } from "../models/IEmoji";

export async function fetchEmojis(categoryType: string) {
  try {
    const response = await fetch(
      `https://emojihub.yurace.pro/api/all/category/${categoryType}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const data: IEmoji[] = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
