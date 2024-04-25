import { defineStore } from 'pinia'

import * as s$data from '@/service/data'

export const dataliststore = defineStore({
    id: 'data',
    state: () => ({
        dataproxi: [],
        dataproxi1: [],

        datapzemr: [],
        datapzemr1: [],

        datapzems: [],
        datapzems1: [],

        datapzemt: [],
        datapzemt1: [],

        databaterai: [],

        //History Data
        dataHistoriproxi: [],
        dataHistoriproxi1: [],
        dataHistoripzemr: [],
        dataHistoripzems: [],
        dataHistoripzemt: []
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
        async a$proxi1() {
            try {
                const { data } = await s$data.proximity1()
                this.setProxi1(data)
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
        async a$pzemr1() {
            try {
                const { data } = await s$data.pzemR1()
                this.setPzemR1(data)
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
        async a$pzems1() {
            try {
                const { data } = await s$data.pzemS1()
                this.setPzemS1(data)
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
        async a$pzemt1() {
            try {
                const { data } = await s$data.pzemT1()
                this.setPzemT1(data)
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

        // History API
        async a$historiprox(date) {
            try {
                const { data } = await s$data.historiprox(date)
                this.sethistoriprox(data)
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$historiprox1(date) {
            try {
                const { data } = await s$data.historiprox1(date)
                this.sethistoriprox1(data)
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
        sethistoriprox1(data) {
            this.dataHistoriproxi1 = data
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
        setProxi1(data) {
            this.dataproxi1 = data
        },

        setPzemR(data) {
            this.datapzemr = data
        },
        setPzemR1(data) {
            this.datapzemr1 = data
        },

        setPzemS(data) {
            this.datapzems = data
        },
        setPzemS1(data) {
            this.datapzems1 = data
        },

        setPzemT(data) {
            this.datapzemt = data
        },
        setPzemT1(data) {
            this.datapzemt1 = data
        },
        setBaterai(data) {
            this.databaterai = data
        }
    },
    getters: {
        // Getter yang sesuai dengan state
        getproxi: (state) => state.dataproxi,
        getproxi1: (state) => state.dataproxi1,

        getpzemr: (state) => state.datapzemr,
        getpzemr1: (state) => state.datapzemr1,

        getpzems: (state) => state.datapzems,
        getpzems1: (state) => state.datapzems1,

        getpzemt: (state) => state.datapzemt,
        getpzemt1: (state) => state.datapzemt1,

        getbaterai: (state) => state.databaterai,

        // Getter history APi

        gethistoriprox: (state) => state.dataHistoriproxi,
        gethistoriprox1: (state) => state.dataHistoriproxi1,
        gethistoripzemr: (state) => state.dataHistoripzemr,
        gethistoripzems: (state) => state.dataHistoripzems,
        gethistoripzemt: (state) => state.dataHistoripzemt,
    }
});