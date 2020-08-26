import Style from './Style';

type LogFunction = (type: string, style: Style, ...args: any[]) => void;

export default LogFunction;
