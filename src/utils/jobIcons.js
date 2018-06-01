import ALC from '@/assets/images/jobs/ALC.png'
import ARM from '@/assets/images/jobs/ARM.png'
import BSM from '@/assets/images/jobs/BSM.png'
import CRP from '@/assets/images/jobs/CRP.png'
import CUL from '@/assets/images/jobs/CUL.png'
import GSM from '@/assets/images/jobs/GSM.png'
import LTW from '@/assets/images/jobs/LTW.png'
import WVR from '@/assets/images/jobs/WVR.png'
import BTN from '@/assets/images/jobs/BTN.png'
import FSH from '@/assets/images/jobs/FSH.png'
import MIN from '@/assets/images/jobs/MIN.png'

export const crafting = {
  ALC: { name: 'alchemy', src: ALC },
  ARM: { name: 'armoury', src: ARM },
  BSM: { name: 'blacksmithing', src: BSM },
  CRP: { name: 'carpentry', src: CRP },
  CUL: { name: 'culinary', src: CUL },
  GSM: { name: 'goldsmithing', src: GSM },
  LTW: { name: 'leatherworking', src: LTW },
  WVR: { name: 'weaving', src: WVR }
}

export const gathering = {
  BTN: { name: 'botany', src: BTN },
  FSH: { name: 'fishing', src: FSH },
  MIN: { name: 'mining', src: MIN }
}

export default Object.assign({}, crafting, gathering)
