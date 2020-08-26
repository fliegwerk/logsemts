import ChalkLogger from "./ChalkLogger";
import {StyleInterface} from "../types/Style";
import chalk from "chalk";

const style1: StyleInterface = {
    background: 'red',
    css: '',
    color: '#fff'
}

const style2: StyleInterface = {
    color: 'green',
    background: '#ffffff',
    css: ''
}

describe('ChalkLogger', () => {
    it('should log', () => {
        ChalkLogger(chalk)('TEST',
            style1,
        'ChalkLogger Test',
            style2,
            'Hello world'
    )
    })
})