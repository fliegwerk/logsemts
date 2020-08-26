import Style from './Style';

/**
 * A function that logs the semantic information (including its style) to a specific system.
 *
 * This can, e.g., log the entries to the browser console or send it to a remote database.
 *
 * @see {@link Logger}
 * @see {@link Style}
 */
type LogFunction =
/**
 * Logs the semantic message to a specific system, e.g., the browser's console
 * @param type The semantic type of the message. E.g., `'SUCCESS'`, `'DEBUG'`, or `'ERROR'`
 * @param style The style of the message's semantic type
 * @param componentName The component's name. E.g., `'API Client'`
 * @param componentStyle The component's style (a black lightgray `background` with a generated text `color` based on the name)
 */
    (type: string, style: Style, componentName:string, componentStyle: Style, ...args: any[]) => void;

export default LogFunction;
