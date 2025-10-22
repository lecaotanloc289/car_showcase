"use client";
import { CarData, CarProps } from "@/types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}
const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const make_id = car.make.id;
  const make_model_id = car.id;
  const [data, setData] = useState<CarData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setData(null);
      return;
    }

    const loadCarDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/car-details?make_id=${make_id}&make_model_id=${make_model_id}`
        );

        if (!response.ok) {
          throw new Error(`API call failed: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.status === "not_found") {
          console.warn("Không tìm thấy dữ liệu trim:", result.message);
          setData(null);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch car details:", error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Chạy hàm
    loadCarDetails();
  }, [isOpen, make_id, make_model_id]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={"relative z-10"} onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0 "
          >
            <div className="fixed inset-0 bg-black/25 "></div>
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className={
                    "relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5"
                  }
                >
                  <button
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    type="button"
                    onClick={closeModal}
                  >
                    <Image
                      src={"/close.svg"}
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-img-pattern bg-cover bg-center rounded-lg">
                      {/* <Image
                        src={generateCarImageUrl(car)}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      /> */}
                      {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                          <p>Loading details...</p>
                        </div>
                      ) : data ? (
                        <p>Dữ liệu: {data?.description}</p>
                      ) : null}
                    </div>
                    <div className="flex gap-3">
                      {[29, 33, 13].map((item) => (
                        <div
                          key={item}
                          className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg"
                        >
                          {/* <Image
                            src={generateCarImageUrl(car, `${item}`)}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          /> */}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex  flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {/* {car?.make} */}
                      {/* {car?.model} */}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {/* {Object.entries(car).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between gap-5 w-full text-right"
                        >
                          <h4 className="text-grey capitalize">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-black-100 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))} */}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
