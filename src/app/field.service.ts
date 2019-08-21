import { Injectable } from '@angular/core';
import { Field } from './field.module';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  /*
  private fields: Field[] =[
    new Field(1, 'Uroloģija', 'Urology', `Uroloģija (grieķu: οὖρον (ouron) — 'urīns' un λογία (logia) — 'mācība') ir medicīnas nozare, kas pētī urīnizvadorgānu (nieru, urīnpūšļa, urīnizvadkanāla) un vīriešu dzimumorgānu slimību izcelšanos, attīstību, diagnostiku, ārstēšanu un profilaksi.` , `Urology (from Greek οὖρον ouron "urine" and -λογία -logia "study of"), also known as genitourinary surgery, is the branch of medicine that focuses on surgical and medical diseases of the male and female urinary-tract system and the male reproductive organs.` ),
    new Field(2, 'Nefroloģija', 'Nephrology', `Nefroloģija ir medicīnas nozare, kas pētī nieru uzbūvi, darbību un slimības, to ārstēšanu un profilaksi, īpaši attīstījusies pēdējos gados. Nefroloģija cieši saistīta ar uroloģiju. Nieru slimību ārstēšanā izmanto dažādas metodes, to vidū mākslīgo nieri un nieru pārstādīšanu.`, `Nephrology (from Greek nephros "kidney", combined with the suffix -logy, "the study of") is a specialty of medicine and pediatrics that concerns itself with the kidneys: the study of normal kidney function and kidney disease, the preservation of kidney health, and the treatment of kidney disease, from diet and medication to renal replacement therapy (dialysis and kidney transplantation).`),
    new Field(3, 'Oftalmoloģija', 'Oftamology', `Oftalmoloģija (grieķu: ὀφθαλμός, ophthalmos — ‘acs’, λόγος, logos — ‘jēdziens, mācība’) ir medicīnas nozare, kas pēta acs uzbūvi, tās funkcijas, kā arī acu slimības, to ārstēšanas un profilakses iespējas. Oftalmologs ir acu slimības ārsts un oftalmoloģijas speciālists.`, `Ophthalmology (/ˌɒfθælˈmɒlədʒi/)[1] is a branch of medicine and surgery which deals with the diagnosis and treatment of eye disorders.[2] An ophthalmologist is a specialist in ophthalmology. The credentials include a degree in medicine, followed by additional four to five years of ophthalmology residency training.`)
  ];  
  */
  getFields(fields: Field []){
    return [...fields];
  }
  getField(fields: Field [], id:number){
    var result = fields.find(o => o.id === id);
    return result;
  }

  filterFields(fields: Field [], searchTerm, isLatvian) {
    return fields.filter(field => {
      if(isLatvian){
        return field.titleLV.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
      else{
        return field.titleENG.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
      
    });
  }


  constructor() { }

}
