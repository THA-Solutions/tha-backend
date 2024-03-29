import { Company } from './company.entity';
import { Image } from './image.entity';

export class Inverter {
  id?: string;

  id_company?: string;
  company: Company;

  id_image?: string;
  image: Image;

  title: string;

  cc_voltage: string;

  mppt_voltage_range: string;

  max_input_current: string;

  max_short_circuit_current_per_tracker: string;

  num_mppt: number;

  max_output_current: string;

  ca_nominal_power_range: string;

  adjustable_power_factor: string;

  thdi: string;

  max_efficiency: string;

  european_efficiency: string;

  mppt_efficiency: string;

  cc_reverse_polarity_protection: string;

  cc_switch: string;

  cc_surge_protection: string;

  output_overcurrent_protection: string;

  ac_overvoltage_protection: string;

  ground_fault_monitoring: string;

  dimensions: string;

  weight: string;

  operating_temperature_range: string;

  nighttime_power_consumption: string;

  cooling: string;

  protection_degree: string;

  warranty: string;

  network_monitoring: string;
}
