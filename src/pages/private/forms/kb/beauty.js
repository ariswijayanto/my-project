
export default {

    "0101": (normalize) => {

        return {
            jumlah_anak: normalize.Jawaban_H1
        }
    },
    "0102": (normalize) => {
        const answer1 = normalize.answer[0];
        const answer2 = normalize.answer[1];
        return {
            kelahiran: normalize.Jawaban_H1,
            lahir_hidup_laki_laki: answer1.Jawaban_D1.toString(),
            lahir_hidup_perempuan: answer1.Jawaban_D2.toString(),
            masih_hidup_laki_laki: answer2.Jawaban_D1.toString(),
            masih_hidup_perempuan: answer2.Jawaban_D2.toString()

        }
    },

    "0103": (normalize) => {
        const answer1 = normalize.answer[0];
        const sedang_hamil = answer1.No_Jawaban;
        let beauty = {
            sedang_hamil
        };
        if (sedang_hamil === "1") {
            beauty.sedang_hamil_ingin = answer1.pilihankb;
            beauty.usia_kehamilan = answer1.Jawaban_D1
        } else if (sedang_hamil === "2") {
            beauty.ingin_anak = answer1.pilihankb;
        }

        return beauty;
    },
    "0104": (normalize) => {
        const answer1 = normalize.answer[0];

        return {
            menggunakan_kontrasepsi: answer1.No_Jawaban
        }
    },
    "0105": (normalize) => {
        const answer1 = normalize.answer[0];

        return {
            pernah_menggunakan_kontrasepsi: answer1.No_Jawaban,
            bulan_mulai: answer1.Jawaban_D1 ? answer1.Jawaban_D1 : '',
            tahun_mulai: answer1.Jawaban_D2 ? answer1.Jawaban_D2 : '',
            bulan_berhenti: answer1.Jawab_D3 ? answer1.Jawab_D3 : '',
            tahun_berhenti: answer1.Jawab_D4 ? answer1.Jawab_D4 : ''
        }
    },

    "0106": (normalize) => {
        const answer1 = normalize.answer[0];

        return {
            jenis_kontrasepsi: answer1.No_Jawaban
        }
    },
    "0107": (normalize) => {


        return {
            bulan_mulai_menggunakan_modern: normalize.Jawaban_H1,
            tahun_mulai_menggunakan_modern: normalize.Jawaban_H2
        }
    },
    "0108": (normalize) => {

        const answer1 = normalize.answer[0];

        return {
            tempat_pelayanan: answer1.No_Jawaban,
            tempat_pelayanan_lainnya: answer1.Lainnya
        }


    },
    "0109": (normalize) => {

        const answer1 = normalize.answer[0];
        const answer2 = normalize.answer[1];
        const answer3 = normalize.answer[2];

        return {
            info_jenis_kb: answer1.pilihankb,
            info_efek_samping_kb: answer2.pilihankb,
            info_jika_mengalami_efek: answer3.pilihankb
        }


    },
    "0110": (normalize) => {

        const answer1 = normalize.answer[0];

        return {
            alasan_tidak_kb: answer1.No_Jawaban,
            alasan_tidak_kb_lainnya: answer1.Lainnya
        }


    }
}