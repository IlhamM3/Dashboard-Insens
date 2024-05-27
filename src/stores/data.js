import { defineStore } from 'pinia'

import * as s$data from '@/service/data'

export const dataliststore = defineStore({
    id: 'data',
    state: () => ({
        dataproxi: [],

        datapzemr: [],

        datapzems: [],

        datapzemt: [],

        databaterai: [],

        //History Data
        dataHistoriproxi: [],
        dataHistoripzemr: [],
        dataHistoripzems: [],
        dataHistoripzemt: [],

        //message delete
        delmessageprox: [],
        delmessagepzemr: [],

    }),
    actions: {
        async a$proxi() {
            try {
                const { data } = await s$data.proximity()
                this.setProxi(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$proxi() {
            try {
                const { data } = await s$data.deleteproximity();
                this.delmessageprox = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$proxibyid(id) {
            try {
                const { data } = await s$data.deleteproximitybyid(id);
                this.delmessageprox = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        async a$pzemr() {
            try {
                const { data } = await s$data.pzemR()
                this.setPzemR(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$pzemr() {
            try {
                const { data } = await s$data.deletepzemR();
                this.delmessagepzemr = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$pzemrbyid(id) {
            try {
                const { data } = await s$data.deletepzemRbyid(id);
                this.delmessagepzemr = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        async a$pzems() {
            try {
                const { data } = await s$data.pzemS()
                this.setPzemS(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$pzems() {
            try {
                await s$data.deletepzemS();
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$pzemsbyid(id) {
            try {
                const { data } = await s$data.deletepzemSbyid(id);
                this.delmessagepzemr = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        async a$pzemt() {
            try {
                const { data } = await s$data.pzemT()
                this.setPzemT(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$pzemt() {
            try {
                const { data } = await s$data.deletepzemT();
                this.delmessagepzemr = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async del$pzemtbyid(id) {
            try {
                const { data } = await s$data.deletepzemTbyid(id);
                this.delmessagepzemr = data.message;
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        async a$baterai() {
            try {
                const { data } = await s$data.baterai()
                this.setBaterai(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$mesin() {
            try {
                const { data } = await s$data.mesin()
                this.setmesin(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$qtyproduct(body) {
            try {
                await s$data.qtyproduct(body);
            } catch ({ error, message }) {
                throw message ?? error
            }
        },

        // History API
        async a$historiprox(date) {
            try {
                const { data } = await s$data.historiprox(date)
                this.sethistoriprox(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$historipzemr(date) {
            try {
                const { data } = await s$data.historipzemr(date)
                this.sethistoripzemr(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$historipzems(date) {
            try {
                const { data } = await s$data.historipzems(date)
                this.sethistoripzems(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$historipzemt(date) {
            try {
                const { data } = await s$data.historipzemt(date)
                this.sethistoripzemt(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },

        sethistoriprox(data) {
            this.dataHistoriproxi = data
        },
        sethistoripzemr(data) {
            this.dataHistoripzemr = data
        },
        sethistoripzems(data) {
            this.dataHistoripzems = data
        },
        sethistoripzemt(data) {
            this.dataHistoripzemt = data
        },


        // Mutations untuk memperbarui state
        setProxi(data) {
            this.dataproxi = data
        },

        setPzemR(data) {
            this.datapzemr = data
        },

        setPzemS(data) {
            this.datapzems = data
        },

        setPzemT(data) {
            this.datapzemt = data
        },
        setBaterai(data) {
            this.databaterai = data
        },
        setmesin(data) {
            this.datamesin = data
        }
    },
    getters: {
        // Getter yang sesuai dengan state
        getproxi: (state) => state.dataproxi,

        getpzemr: (state) => state.datapzemr,

        getpzems: (state) => state.datapzems,

        getpzemt: (state) => state.datapzemt,

        getbaterai: (state) => state.databaterai,
        getmesin: (state) => state.datamesin,

        // Getter history APi

        gethistoriprox: (state) => state.dataHistoriproxi,
        gethistoripzemr: (state) => state.dataHistoripzemr,
        gethistoripzems: (state) => state.dataHistoripzems,
        gethistoripzemt: (state) => state.dataHistoripzemt,

        //get response message
        getdelmessageprox: (state) => state.delmessageprox,
        getdelmessagepzemr: (state) => state.delmessagepzemr,

    }
});