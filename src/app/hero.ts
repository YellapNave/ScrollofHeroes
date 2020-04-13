export type pf2Class = 
    'Alchemist'
    | 'Barbarian'
    | 'Bard'
    | 'Champion'
    | 'Cleric'
    | 'Druid'
    | 'Fighter'
    | 'Monk'
    | 'Ranger'
    | 'Rogue'
    | 'Sorcerer'
    | 'Wizard';

export type drosAncestry =
    'Human'
    | 'Bujyun'
    | 'Niqqoth'
    | 'Grey'
    | 'Rokhos'
    | 'Sylvan';

export interface Hero {
    readonly id: number;
    name: string;
    player: string;
    class?: pf2Class;
    ancestry: drosAncestry;
    level?: number;
    stats?: { 
        str: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number
    }
}