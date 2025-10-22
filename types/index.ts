import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}
export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

// export interface CarProps {
//   city_mpg: number;
//   // class: string;
//   combination_mpg: number;
//   cylinders: number;
//   displacement: number;
//   drive: string;
//   fuel_type: string;
//   highway_mpg: number;
//   make: string;
//   model: string;
//   transmission: string;
//   year: number;
// }

export interface CarProps {
  id: number;
  make_id: number;
  name: string;
  make: {
    id: number;
    name: string;
  };
}

export interface CarDetailProps {
  make_id: number;
  make_model_id: number;
}

// export interface CarProps {
//   // ID trim (ví dụ 6536)
//   id: number;

//   // ID của model (liên kết tới make_model)
//   make_model_id: number;

//   // Năm sản xuất
//   year: number;

//   // Tên trim (ví dụ: "Base")
//   name: string;

//   // Mô tả chi tiết
//   description: string;

//   // Giá đề xuất của hãng (Manufacturer Suggested Retail Price)
//   msrp: number;

//   // Giá đại lý (Invoice price)
//   invoice: number;

//   // Thời điểm tạo bản ghi
//   created: string;

//   // Thời điểm cập nhật gần nhất
//   modified: string;

//   // Thông tin model
//   make_model: MakeModel;
// }

// export interface MakeModel {
//   // ID model (ví dụ: 424)
//   id: number;

//   // ID hãng xe (ví dụ: 3)
//   make_id: number;

//   // Tên model (ví dụ: "i8")
//   name: string;

//   // Hãng xe (BMW, Ford, v.v.)
//   make: Make;
// }

// export interface Make {
//   // ID hãng
//   id: number;

//   // Tên hãng (ví dụ: "BMW")
//   name: string;
// }


export interface FilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit?: number;
  model: string;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}


// === Root object ===
export interface CarData {
  id: number;
  make_model_id: number;
  year: number;
  name: string;
  description: string;
  msrp: number;
  invoice: number;
  created: string;
  modified: string;

  make_model_trim_interior_colors: InteriorColor[];
  make_model_trim_exterior_colors: ExteriorColor[];
  make_model_trim_mileage: Mileage;
  make_model_trim_engine: Engine;
  make_model_trim_body: Body;
  make_model: MakeModel;
}

// === Color interfaces ===
export interface InteriorColor {
  id: number;
  make_model_trim_id: number;
  name: string;
  rgb: string; // "25,25,25"
}

export interface ExteriorColor {
  id: number;
  make_model_trim_id: number;
  name: string;
  rgb: string;
}

// === Mileage info ===
export interface Mileage {
  id: number;
  make_model_trim_id: number;
  fuel_tank_capacity: string; // gallon
  combined_mpg: number;
  epa_city_mpg: number;
  epa_highway_mpg: number;
  range_city: number;
  range_highway: number;

  battery_capacity_electric: number | null;
  epa_time_to_charge_hr_240v_electric: number | null;
  epa_kwh_100_mi_electric: number | null;
  range_electric: number | null;
  epa_highway_mpg_electric: number | null;
  epa_city_mpg_electric: number | null;
  epa_combined_mpg_electric: number | null;
}

// === Engine info ===
export interface Engine {
  id: number;
  make_model_trim_id: number;
  engine_type: string;          // e.g. "gas"
  fuel_type: string;            // e.g. "premium unleaded (recommended)"
  cylinders: string;            // e.g. "I4"
  size: string;                 // e.g. "2.4"
  horsepower_hp: number;
  horsepower_rpm: number;
  torque_ft_lbs: number;
  torque_rpm: number;
  valves: number;
  valve_timing: string;         // e.g. "Variable"
  cam_type: string;             // e.g. "Double overhead cam (DOHC)"
  drive_type: string;           // e.g. "front wheel drive"
  transmission: string;         // e.g. "8-speed automated manual"
}

// === Body info ===
export interface Body {
  id: number;
  make_model_trim_id: number;
  type: string;                 // e.g. "Sedan"
  doors: number;
  length: string;
  width: string;
  seats: number;
  height: string;
  wheel_base: string;
  front_track: string | null;
  rear_track: string | null;
  ground_clearance: string;
  cargo_capacity: string;
  max_cargo_capacity: string | null;
  curb_weight: number;
  gross_weight: number | null;
  max_payload: number | null;
  max_towing_capacity: number | null;
}

// === Make and model info ===
export interface MakeModel {
  id: number;
  make_id: number;
  name: string;     // e.g. "ILX"
  make: Make;       // nested object
}

export interface Make {
  id: number;
  name: string;     // e.g. "Acura"
}
