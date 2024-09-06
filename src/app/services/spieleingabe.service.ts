import { Injectable } from '@angular/core';
import { I6TageRennenEingabe, IBlitztunierEingabe, IKombimeisterschaftEingabe, IMeisterschaftEingabe, INeunerRattenEingabe, IPokalEingabe, ISargkegelnEingabe } from '../core/interfaces/spieleingabe';

@Injectable({
  providedIn: 'root'
})
export class SpieleingabeService {

  constructor() { }

  public InitFgEingabe9erRatten():INeunerRattenEingabe[]{
    let data: INeunerRattenEingabe[] = [];
    return data;
  }

  public InitFgEingabe6TageRennen():I6TageRennenEingabe[]{
    let data: I6TageRennenEingabe[] = [];
    return data;
  }
  
  public InitFgEingabePokal():IPokalEingabe[]{
    let data: IPokalEingabe[] = [];
    return data;
  }
  
  public InitFgEingabeSargkegeln():ISargkegelnEingabe[]{
    let data: ISargkegelnEingabe[] = [];
    return data;
  }
  
  public InitFgEingabeMeisterschaft():IMeisterschaftEingabe[]{
    let data: IMeisterschaftEingabe[] = [];
    return data;
  }
  
  public InitFgEingabeKombimeisterschaft():IKombimeisterschaftEingabe[]{
    let data: IKombimeisterschaftEingabe[] = [];
    return data;
  }
  
  public InitFgEingabeBlitztunier():IBlitztunierEingabe[]{
    let data: IBlitztunierEingabe[] = [];
    return data;
  }
}
