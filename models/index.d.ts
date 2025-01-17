export interface ChemicalDTO {
    id: number;
    officialname: string;
    name: string;
    amount: number;
    unit: string;
    poisonouseffect: null | string;
    storage: string;
    expiration: Date;
    description: string;
}

export interface WoodenToolDTO {
    id: number;
    name: string;
    amount: number;
    description: string;
}

export interface MetalToolDTO {
    id: number;
    name: string;
    amount: number;
    description: string;
}

export interface GlassContainerDTO {
    id: number;
    name: string;
    capacity: number;
    unit: string;
    amount: number;
    description: string;
}

export interface DeviceDTO {
    id: number;
    name: string;
    amount: number;
    fieldofuse: string;
    description: string;
}

export interface OtherItemDTO {
    id: number;
    name: string;
    amount: number;
    description: string;
}

export interface CalendarDTO {
    id: number;
    week: 1 | 2 | 3;
    day: 1 | 2 | 3 | 4 | 5;
    timeofclass: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    activity: string;
    //alcsoport kiírás szokott lenni , az mehet ide
    description: string;
    //szétválasztható fiz és kémia részre megnevezés alapján
    //vagy hagyható egybe -> fulllab
    classroom: "teljes labor" | "kémia labor" | "fizika labor";
    groups: GroupDTO[];    
    istimetableclass: 0 | 1;

    teacher: UserDTO;
}

export interface GroupDTO {
    id: number;
    name: string;
    teacher: UserDTO;
    teacherId: number;
    studentnames: string;
    classes: CalendarDTO[];
}

export interface ExperimentDTO {
    id: number;
    name: string;
    description: string;
    neededchemicals: ChemicalDTO[];
    neededwoodentools: WoodenToolDTO[];
    neededmetaltools: MetalToolDTO[];
    neededglasscontainers: GlassContainerDTO[];
    neededdevices: DeviceDTO[];
    neededotheritems: OtherItemDTO[];
}

export interface UserDTO {
    id: number;
    username: string;
    password: string;
    role: "student" | "teacher" | "admin";     
    groups: GroupDTO[] | null;
    lessons: CalendarDTO[] | null;
}

export interface LoginDTO {
    username: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
    role: string;
    id: string;
}