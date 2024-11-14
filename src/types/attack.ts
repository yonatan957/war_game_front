export interface IAttack {
    _id: string;
    name: string;
    tymeToHit: number;
    id_attacker: string;
    id_intercepted?: string;
    intercepted: boolean;
}