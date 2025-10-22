import { NextResponse } from "next/server";

async function fetchRapidAPIData(make_id: string, make_model_id: string) {
  const apiKey = process.env.RAPID_CAR_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RAPID_CAR_API_KEY environment variable");
  }

  const headers = {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
  };

  const baseUrl = "https://car-api2.p.rapidapi.com/api";

  try {
    let response = await fetch(
      `${baseUrl}/trims?verbose=yes&year=2020&direction=asc&make_id=${make_id}&make_model_id=${make_model_id}&sort=id`,
      {
        method: "GET",
        headers: headers,
        // next: { revalidate: 300 },
      }
    );

    let result = await response.json();

    if (!result.data || result.data.length === 0) {
      return { status: "not_found", message: "No trim data found" };
    }

    const trim_id = result.data[0].id;
    response = await fetch(`${baseUrl}/trims/${trim_id}`, {
      method: "GET",
      headers: headers,
      //   next: { revalidate: 3600 },
    });

    result = await response.json();
    return result;
  } catch (error) {
    console.error("RapidAPI Fetch Error:", error);
    throw new Error("Failed to fetch data from RapidAPI");
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const make_id = searchParams.get("make_id");
    const make_model_id = searchParams.get("make_model_id");

    if (!make_id || !make_model_id) {
      return NextResponse.json(
        { error: "Missing required parameters: make_id and make_model_id" },
        { status: 400 }
      );
    }

    const data = await fetchRapidAPIData(make_id, make_model_id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
