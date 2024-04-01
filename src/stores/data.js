import { defineStore } from 'pinia'

import * as s$data from '@/service/data'

export const dataliststore = defineStore({
    id: 'data',
    state: () => ({
        dataproxi: [],
        datapzemr: [],
        datapzems: [],
        datapzemt: [],
        databaterai: []
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
        async a$pzemr() {
            try {
                const { data } = await s$data.pzemR()
                this.setPzemR(data) // Memperbarui state pzemr
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$pzems() {
            try {
                const { data } = await s$data.pzemS()
                this.setPzemS(data) // Memperbarui state pzems
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$pzemt() {
            try {
                const { data } = await s$data.pzemT()
                this.setPzemT(data) // Memperbarui state pzemt
            } catch ({ message, error }) {
                throw message ?? error
            }
        },
        async a$baterai() {
            try {
                const { data } = await s$data.baterai()
                this.setBaterai(data) // Memperbarui state baterai
            } catch ({ message, error }) {
                throw message ?? error
            }
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
        }
    },
    getters: {
        // Getter yang sesuai dengan state
        getproxi: (state) => state.dataproxi,
        getpzemr: (state) => state.datapzemr,
        getpzems: (state) => state.datapzems,
        getpzemt: (state) => state.datapzemt,
        getbaterai: (state) => state.databaterai,
    }
});
