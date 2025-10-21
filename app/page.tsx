/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CarCard,
  CarDetails,
  CustomFilter,
  Hero,
  SearchBar,
  ShowMore,
} from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { FilterProps } from "@/types";
import { fetchCarDetails, fetchCars, fetchYears } from "@/utils";

export default async function Home({
  searchParams,
}: {
  searchParams: FilterProps;
}) {
  const allYears = await fetchYears();

  const params = await searchParams;
  const carData = await fetchCars({
    manufacturer: params.manufacturer || "",
    year: params.year || 2020,
    fuel: params.fuel || "",
    limit: params.limit || 20,
    model: params.model || "",
  });

  const { collections, data } = carData;
  const allCars = data;
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p className="">Explore the cars your might like</p>
        </div>
        <div className="home__filters inline-flex justify-between">
          <SearchBar />
          <div className="home__filter-container my-4">
            <CustomFilter title="Fuel" options={fuels} />
            <CustomFilter title="Year" options={allYears} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section className="">
            <div className="home__cars-wrapper">
              {/* {allCars?.map((car) => (
                <CarCard key={car} car={car} />
              ))} */}

              {allCars?.map((car: any) => (
                <CarCard key={car?.id} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={!((searchParams.limit || 10) > allCars.length)}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            {/* <p className="">{allCars?.message}</p> */}
          </div>
        )}
      </div>
    </main>
  );
}
