import { Campaign } from './campaign.model';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    playerIn: AngularFirestoreDocument<Campaign>[];
    isAdmin?: boolean;
    characters?: string[];
}