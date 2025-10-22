/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarProps, FilterProps } from "@/types";
const baseUrl = `https://car-api2.p.rapidapi.com/api`;
const headers = {
  "x-rapidapi-key": `${process.env.RAPID_CAR_API_KEY}`,
  "x-rapidapi-host": "car-api2.p.rapidapi.com",
};
export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model } = filters;

  // OLD API CAN'T NOT CALL
  // const headers = {
  //   "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
  //   "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  // };
  // const response = await fetch(
  //   `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`,
  //   {
  //     headers: headers,
  //   }
  // );
  // https://car-api2.p.rapidapi.com/api/trims?limit=20&direction=asc&sort=id&year=2020&verbose=yes&make=BMW
  const response = await fetch(
    `${baseUrl}/models?make=${manufacturer}&model=${model}&sort=id&direction=asc&year=2020&verbose=yes`,

    // fetch trim
    // `${baseUrl}/trims?limit=${limit}&direction=asc&sort=id&year=${year}&model=${model}&verbose=yes&make=${manufacturer}`,
    { headers: headers }
  );

  const result = await response.json();
  return result;
}

export async function fetchYears() {
  try {
    const response = await fetch(`${baseUrl}/years`, { headers });
    const result = await response.json();
    const allYears = result?.map((year: any) => ({
      title: `${year}`,
      value: `${year}`,
    }));
    return allYears;
  } catch (error) {
    return error;
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  // const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  // url.searchParams.append("make", make);
  // url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  // url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
