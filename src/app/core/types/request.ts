import { EquipCategory } from './equip-category';
import { RequestStatus } from "./request-status";

export interface Request {
    requestId: number;
    customerId: number;
    requestDesc: string;
    equipmentDesc: string;
    defectDesc: string;
    status: RequestStatus[];
    requestStatus: RequestStatus[];
    budget: number;
    repairDesc: string;
    customerOrientations: string;
    image: string;
    equipCategory: EquipCategory;
    equipmentCategory?: EquipCategory;
}
