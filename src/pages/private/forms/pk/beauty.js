
import subforms from './questions.json';

export default (qid, normalize) => {


    if (subforms[qid].tipe === 'radio' || subforms[qid] === 'checkbox') {

        return {
            jawaban: normalize.Jawab_Pilih,
            kondisi: normalize.Jawaban_H1,
            jawaban_lainnya: normalize.Lainnya
        }
    } else if (subforms[qid].tipe === 'number') {

        return {
            jawaban: normalize.Jawaban_H1.toString(),
            jawaban_lainnya: normalize.Lainnya
        }
    }

    return {}

}