import { Injectable } from '@nestjs/common';
import { CreateInverterDto, UpdateInverterDto } from 'src/core/dto';
import { Image, Inverter } from 'src/core/entities';
import {
  CompanyRepository,
  InverterRepository,
} from 'src/frameworks/data-services/database';
import { ImageService } from '../image/image.use-case';

@Injectable()
export class InverterFactoryService {
  constructor(
    private inverterService: InverterRepository,
    private companyService: CompanyRepository,
    private imageUseCase: ImageService,
  ) {}

  async createNewInverter(createInverterDto: CreateInverterDto) {
    const newInverter = new Inverter();

    newInverter.company = await this.companyHandler(
      createInverterDto.id_company,
    );

    newInverter.ac_overvoltage_protection =
      createInverterDto.ac_overvoltage_protection;
    newInverter.adjustable_power_factor =
      createInverterDto.adjustable_power_factor;
    newInverter.ca_nominal_power_range =
      createInverterDto.ca_nominal_power_range;
    newInverter.cc_reverse_polarity_protection =
      createInverterDto.cc_reverse_polarity_protection;
    newInverter.cc_surge_protection = createInverterDto.cc_surge_protection;
    newInverter.cc_switch = createInverterDto.cc_switch;
    newInverter.cc_voltage = createInverterDto.cc_voltage;
    newInverter.cooling = createInverterDto.cooling;
    newInverter.dimensions = createInverterDto.dimensions;
    newInverter.european_efficiency = createInverterDto.european_efficiency;
    newInverter.ground_fault_monitoring =
      createInverterDto.ground_fault_monitoring;
    newInverter.max_efficiency = createInverterDto.max_efficiency;
    newInverter.max_input_current = createInverterDto.max_input_current;
    newInverter.max_output_current = createInverterDto.max_output_current;
    newInverter.max_short_circuit_current_per_tracker =
      createInverterDto.max_short_circuit_current_per_tracker;
    newInverter.mppt_efficiency = createInverterDto.mppt_efficiency;
    newInverter.mppt_voltage_range = createInverterDto.mppt_voltage_range;
    newInverter.network_monitoring = createInverterDto.network_monitoring;
    newInverter.nighttime_power_consumption =
      createInverterDto.nighttime_power_consumption;
    newInverter.num_mppt = +createInverterDto.num_mppt;
    newInverter.operating_temperature_range =
      createInverterDto.operating_temperature_range;
    newInverter.output_overcurrent_protection =
      createInverterDto.output_overcurrent_protection;
    newInverter.protection_degree = createInverterDto.protection_degree;
    newInverter.thdi = createInverterDto.thdi;
    newInverter.title = createInverterDto.title;
    newInverter.warranty = createInverterDto.warranty;
    newInverter.weight = createInverterDto.weight;

    if (createInverterDto.image) {
      newInverter.image = await this.imageHandler(createInverterDto.image);
    }

    return newInverter;
  }

  async updateInverter(updateInverterDto: UpdateInverterDto) {
    const updatedInverter = new Inverter();

    let inverter = await this.inverterService.findById(updateInverterDto.id);

    if (updateInverterDto.ac_overvoltage_protection) {
      updatedInverter.ac_overvoltage_protection =
        updateInverterDto.ac_overvoltage_protection;
    }
    if (updateInverterDto.ca_nominal_power_range) {
      updatedInverter.adjustable_power_factor =
        updateInverterDto.adjustable_power_factor;
    }
    if (updateInverterDto.ca_nominal_power_range) {
      updatedInverter.ca_nominal_power_range =
        updateInverterDto.ca_nominal_power_range;
    }
    if (updateInverterDto.cc_reverse_polarity_protection) {
      updatedInverter.cc_reverse_polarity_protection =
        updateInverterDto.cc_reverse_polarity_protection;
    }
    if (updateInverterDto.cc_surge_protection) {
      updatedInverter.cc_surge_protection =
        updateInverterDto.cc_surge_protection;
    }
    if (updateInverterDto.cc_switch) {
      updatedInverter.cc_switch = updateInverterDto.cc_switch;
    }
    if (updateInverterDto.cc_voltage) {
      updatedInverter.cc_voltage = updateInverterDto.cc_voltage;
    }
    if (updateInverterDto.cooling) {
      updatedInverter.cooling = updateInverterDto.cooling;
    }
    if (updateInverterDto.dimensions) {
      updatedInverter.dimensions = updateInverterDto.dimensions;
    }
    if (updateInverterDto.european_efficiency) {
      updatedInverter.european_efficiency =
        updateInverterDto.european_efficiency;
    }
    if (updateInverterDto.ground_fault_monitoring) {
      updatedInverter.ground_fault_monitoring =
        updateInverterDto.ground_fault_monitoring;
    }
    if (updateInverterDto.max_efficiency) {
      updatedInverter.max_efficiency = updateInverterDto.max_efficiency;
    }
    if (updateInverterDto.max_input_current) {
      updatedInverter.max_input_current = updateInverterDto.max_input_current;
    }
    if (updateInverterDto.max_output_current) {
      updatedInverter.max_output_current = updateInverterDto.max_output_current;
    }
    if (updateInverterDto.max_short_circuit_current_per_tracker) {
      updatedInverter.max_short_circuit_current_per_tracker =
        updateInverterDto.max_short_circuit_current_per_tracker;
    }
    if (updateInverterDto.mppt_efficiency) {
      updatedInverter.mppt_efficiency = updateInverterDto.mppt_efficiency;
    }
    if (updateInverterDto.mppt_voltage_range) {
      updatedInverter.mppt_voltage_range = updateInverterDto.mppt_voltage_range;
    }
    if (updateInverterDto.network_monitoring) {
      updatedInverter.network_monitoring = updateInverterDto.network_monitoring;
    }
    if (updateInverterDto.nighttime_power_consumption) {
      updatedInverter.nighttime_power_consumption =
        updateInverterDto.nighttime_power_consumption;
    }
    if (updateInverterDto.num_mppt) {
      updatedInverter.num_mppt = +updateInverterDto.num_mppt;
    }
    if (updateInverterDto.operating_temperature_range) {
      updatedInverter.operating_temperature_range =
        updateInverterDto.operating_temperature_range;
    }
    if (updateInverterDto.output_overcurrent_protection) {
      updatedInverter.output_overcurrent_protection =
        updateInverterDto.output_overcurrent_protection;
    }
    if (updateInverterDto.protection_degree) {
      updatedInverter.protection_degree = updateInverterDto.protection_degree;
    }
    if (updateInverterDto.thdi) {
      updatedInverter.thdi = updateInverterDto.thdi;
    }
    if (updateInverterDto.title) {
      updatedInverter.title = updateInverterDto.title;
    }
    if (updateInverterDto.warranty) {
      updatedInverter.warranty = updateInverterDto.warranty;
    }
    if (updateInverterDto.weight) {
      updatedInverter.weight = updateInverterDto.weight;
    }

    if (updateInverterDto.id_company) {
      updatedInverter.company = await this.companyHandler(
        updateInverterDto.id_company,
      );
    }

    if (updateInverterDto.image) {
      if (!inverter.image) {
        updatedInverter.image = await this.imageHandler(
          updateInverterDto.image,
        );
      } else {
        this.imageUseCase.remove(inverter.image.id);
        updatedInverter.image = await this.imageHandler(
          updateInverterDto.image,
        );
      }
    }

    return updatedInverter;
  }

  private async companyHandler(companyId: string) {
    return await this.companyService.findById(companyId).then((company) => {
      if (!company) {
        throw new Error('Company doesn´t exists');
      }
      return company;
    });
  }

  private async imageHandler(imageFile: Image): Promise<Image> {
    let postedImage = new Image();

    postedImage = await this.imageUseCase.create({
      imageFile: imageFile as unknown as Image,
    });

    return postedImage;
  }
}
