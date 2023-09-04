/*
 * Microsoft Application Insights Core Javascript SDK, 3.0.2
 * Copyright (c) Microsoft and contributors. All rights reserved.
 *
 * Microsoft Application Insights Team
 * https://github.com/microsoft/ApplicationInsights-JS#readme
 *
 * ---------------------------------------------------------------------------
 * This is a single combined (rollup) declaration file for the package,
 * if you require a namespace wrapped version it is also available.
 * - Namespaced version: types/applicationinsights-core-js.namespaced.d.ts
 * ---------------------------------------------------------------------------
 */

import { arrForEach } from '@nevware21/ts-utils';
import { arrIndexOf } from '@nevware21/ts-utils';
import { arrMap } from '@nevware21/ts-utils';
import { arrReduce } from '@nevware21/ts-utils';
import { asString } from '@nevware21/ts-utils';
import { utcNow as dateNow } from '@nevware21/ts-utils';
import { objDeepFreeze as deepFreeze } from '@nevware21/ts-utils';
import { dumpObj } from '@nevware21/ts-utils';
import { EnumCls } from '@nevware21/ts-utils';
import { getDocument } from '@nevware21/ts-utils';
import { getGlobal } from '@microsoft/applicationinsights-shims';
import { getInst as getGlobalInst } from '@nevware21/ts-utils';
import { getHistory } from '@nevware21/ts-utils';
import { getNavigator } from '@nevware21/ts-utils';
import { getPerformance } from '@nevware21/ts-utils';
import { getWindow } from '@nevware21/ts-utils';
import { hasDocument } from '@nevware21/ts-utils';
import { hasHistory } from '@nevware21/ts-utils';
import { hasNavigator } from '@nevware21/ts-utils';
import { objHasOwnProperty as hasOwnProperty } from '@nevware21/ts-utils';
import { hasWindow } from '@nevware21/ts-utils';
import { IPromise } from '@nevware21/ts-async';
import { isArray } from '@nevware21/ts-utils';
import { isBoolean } from '@nevware21/ts-utils';
import { isDate } from '@nevware21/ts-utils';
import { isError } from '@nevware21/ts-utils';
import { isFunction } from '@nevware21/ts-utils';
import { isNotTruthy } from '@nevware21/ts-utils';
import { isNullOrUndefined } from '@nevware21/ts-utils';
import { isNumber } from '@nevware21/ts-utils';
import { isObject } from '@nevware21/ts-utils';
import { isString } from '@nevware21/ts-utils';
import { isSymbol } from '@nevware21/ts-utils';
import { isTruthy } from '@nevware21/ts-utils';
import { isTypeof } from '@nevware21/ts-utils';
import { isUndefined } from '@nevware21/ts-utils';
import { ITimerHandler } from '@nevware21/ts-utils';
import { objDefineAccessors } from '@nevware21/ts-utils';
import { objForEachKey } from '@nevware21/ts-utils';
import { objFreeze } from '@nevware21/ts-utils';
import { objKeys } from '@nevware21/ts-utils';
import { objSeal } from '@nevware21/ts-utils';
import { objToString } from '@nevware21/ts-utils';
import { perfNow } from '@nevware21/ts-utils';
import { strEndsWith } from '@nevware21/ts-utils';
import { strShimFunction as strFunction } from '@microsoft/applicationinsights-shims';
import { strShimObject as strObject } from '@microsoft/applicationinsights-shims';
import { strShimPrototype as strPrototype } from '@microsoft/applicationinsights-shims';
import { strStartsWith } from '@nevware21/ts-utils';
import { strTrim } from '@nevware21/ts-utils';
import { strShimUndefined as strUndefined } from '@microsoft/applicationinsights-shims';
import { throwError } from '@nevware21/ts-utils';

/**
 * Get all of the registered events on the target object, this is primarily used for testing cleanup but may also be used by
 * applications to remove their own events
 * @param target - The EventTarget that has registered events
 * @param eventName - [Optional] The name of the event to return the registered handlers and full name (with namespaces)
 * @param evtNamespace - [Optional] Additional namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace,
 * if the eventName also includes a namespace the namespace(s) are merged into a single namespace
 */
export declare function __getRegisteredEvents(target: any, eventName?: string, evtNamespace?: string | string[]): _IRegisteredEvents[];

/**
 * Trys to add an event handler for the specified event to the window, body and document
 * @param eventName - {string} - The name of the event
 * @param callback - {any} - The callback function that needs to be executed for the given event
 * @param evtNamespace - [Optional] Namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace.
 * @return {boolean} - true if the handler was successfully added
 */
export declare function addEventHandler(eventName: string, callback: any, evtNamespace?: string | string[] | null): boolean;

/**
 * Bind the listener to the array of events
 * @param events - An string array of event names to bind the listener to
 * @param listener - The event callback to call when the event is triggered
 * @param excludeEvents - [Optional] An array of events that should not be hooked (if possible), unless no other events can be.
 * @param evtNamespace - [Optional] Namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace.
 * @returns true - when at least one of the events was registered otherwise false
 */
export declare function addEventListeners(events: string[], listener: any, excludeEvents?: string[], evtNamespace?: string | string[]): boolean;

/**
 * Listen to the pagehide and visibility changing to 'hidden' events, because the 'visibilitychange' uses
 * an internal proxy to detect the visibility state you SHOULD use a unique namespace when if you plan to call
 * removePageShowEventListener as the remove ignores the listener argument for the 'visibilitychange' event.
 * @param listener - The event callback to call when a page hide event is triggered
 * @param excludeEvents - [Optional] An array of events that should not be hooked (if possible), unless no other events can be.
 * @param evtNamespace - [Optional] A Namespace to append to the event listeners so they can be uniquely identified and removed
 * based on this namespace. This call also adds an additional unique "pageshow" namespace to the events
 * so that only the matching "removePageHideEventListener" can remove these events.
 * Suggestion: pass as true if you are also calling addPageUnloadEventListener as that also hooks pagehide
 * @returns true - when at least one of the events was registered otherwise false
 */
export declare function addPageHideEventListener(listener: any, excludeEvents?: string[] | null, evtNamespace?: string | string[] | null): boolean;

/**
 * Listen to the pageshow and visibility changing to 'visible' events, because the 'visibilitychange' uses
 * an internal proxy to detect the visibility state you SHOULD use a unique namespace when if you plan to call
 * removePageShowEventListener as the remove ignores the listener argument for the 'visibilitychange' event.
 * @param listener - The event callback to call when a page is show event is triggered
 * @param excludeEvents - [Optional] An array of events that should not be hooked (if possible), unless no other events can be.
 * @param evtNamespace - [Optional/Recommended] A Namespace to append to the event listeners so they can be uniquely
 * identified and removed based on this namespace. This call also adds an additional unique "pageshow" namespace to the events
 * so that only the matching "removePageShowEventListener" can remove these events.
 * @returns true - when at least one of the events was registered otherwise false
 */
export declare function addPageShowEventListener(listener: any, excludeEvents?: string[] | null, evtNamespace?: string | string[] | null): boolean;

/**
 * Listen to the 'beforeunload', 'unload' and 'pagehide' events which indicates a page unload is occurring,
 * this does NOT listen to the 'visibilitychange' event as while it does indicate that the page is being hidden
 * it does not *necessarily* mean that the page is being completely unloaded, it can mean that the user is
 * just navigating to a different Tab and may come back (without unloading the page). As such you may also
 * need to listen to the 'addPageHideEventListener' and 'addPageShowEventListener' events.
 * @param listener - The event callback to call when a page unload event is triggered
 * @param excludeEvents - [Optional] An array of events that should not be hooked, unless no other events can be.
 * @param evtNamespace - [Optional] Namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace.
 * @returns true - when at least one of the events was registered otherwise false
 */
export declare function addPageUnloadEventListener(listener: any, excludeEvents?: string[], evtNamespace?: string | string[]): boolean;

export declare class AppInsightsCore<CfgType extends IConfiguration = IConfiguration> implements IAppInsightsCore<CfgType> {
    config: CfgType;
    logger: IDiagnosticLogger;
    /**
     * An array of the installed plugins that provide a version
     */
    readonly pluginVersionStringArr: string[];
    /**
     * The formatted string of the installed plugins that contain a version number
     */
    readonly pluginVersionString: string;
    /**
     * Returns a value that indicates whether the instance has already been previously initialized.
     */
    isInitialized: () => boolean;
    /**
     * Function used to identify the get w parameter used to identify status bit to some channels
     */
    getWParam: () => number;
    constructor();
    initialize(config: CfgType, extensions: IPlugin[], logger?: IDiagnosticLogger, notificationManager?: INotificationManager): void;
    getChannels(): IChannelControls[];
    track(telemetryItem: ITelemetryItem): void;
    getProcessTelContext(): IProcessTelemetryContext;
    getNotifyMgr(): INotificationManager;
    /**
     * Adds a notification listener. The SDK calls methods on the listener when an appropriate notification is raised.
     * The added plugins must raise notifications. If the plugins do not implement the notifications, then no methods will be
     * called.
     * @param listener - An INotificationListener object.
     */
    addNotificationListener(listener: INotificationListener): void;
    /**
     * Removes all instances of the listener.
     * @param listener - INotificationListener to remove.
     */
    removeNotificationListener(listener: INotificationListener): void;
    /**
     * Get the current cookie manager for this instance
     */
    getCookieMgr(): ICookieMgr;
    /**
     * Set the current cookie manager for this instance
     * @param cookieMgr - The manager, if set to null/undefined will cause the default to be created
     */
    setCookieMgr(cookieMgr: ICookieMgr): void;
    getPerfMgr(): IPerfManager;
    setPerfMgr(perfMgr: IPerfManager): void;
    eventCnt(): number;
    /**
     * Enable the timer that checks the logger.queue for log messages to be flushed.
     * Note: Since 3.0.1 and 2.8.13 this is no longer an interval timer but is a normal
     * timer that is only started when this function is called and then subsequently
     * only _if_ there are any logger.queue messages to be sent.
     */
    pollInternalLogs(eventName?: string): ITimerHandler;
    /**
     * Stop the timer that log messages from logger.queue when available
     */
    stopPollingInternalLogs(): void;
    /**
     * Add a telemetry processor to decorate or drop telemetry events.
     * @param telemetryInitializer - The Telemetry Initializer function
     * @returns - A ITelemetryInitializerHandler to enable the initializer to be removed
     */
    addTelemetryInitializer(telemetryInitializer: TelemetryInitializerFunction): ITelemetryInitializerHandler;
    /**
     * Unload and Tear down the SDK and any initialized plugins, after calling this the SDK will be considered
     * to be un-initialized and non-operational, re-initializing the SDK should only be attempted if the previous
     * unload call return `true` stating that all plugins reported that they also unloaded, the recommended
     * approach is to create a new instance and initialize that instance.
     * This is due to possible unexpected side effects caused by plugins not supporting unload / teardown, unable
     * to successfully remove any global references or they may just be completing the unload process asynchronously.
     * If you pass isAsync as `true` (also the default) and DO NOT pass a callback function then an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will be returned which will resolve once the unload is complete. The actual implementation of the `IPromise`
     * will be a native Promise (if supported) or the default as supplied by [ts-async library](https://github.com/nevware21/ts-async)
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @param unloadComplete - An optional callback that will be called once the unload has completed
     * @param cbTimeout - An optional timeout to wait for any flush operations to complete before proceeding with the
     * unload. Defaults to 5 seconds.
     * @return Nothing or if occurring asynchronously a [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * which will be resolved once the unload is complete, the [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will only be returned when no callback is provided and isAsync is true
     */
    unload(isAsync?: boolean, unloadComplete?: (unloadState: ITelemetryUnloadState) => void, cbTimeout?: number): void | IPromise<ITelemetryUnloadState>;
    getPlugin<T extends IPlugin = IPlugin>(pluginIdentifier: string): ILoadedPlugin<T>;
    /**
     * Add a new plugin to the installation
     * @param plugin - The new plugin to add
     * @param replaceExisting - should any existing plugin be replaced, default is false
     * @param doAsync - Should the add be performed asynchronously
     * @param addCb - [Optional] callback to call after the plugin has been added
     */
    addPlugin<T extends IPlugin = ITelemetryPlugin>(plugin: T, replaceExisting?: boolean, doAsync?: boolean, addCb?: (added?: boolean) => void): void;
    /**
     * Update the configuration used and broadcast the changes to all loaded plugins
     * @param newConfig - The new configuration is apply
     * @param mergeExisting - Should the new configuration merge with the existing or just replace it. Default is to true.
     */
    updateCfg(newConfig: CfgType, mergeExisting?: boolean): void;
    /**
     * Returns the unique event namespace that should be used
     */
    evtNamespace(): string;
    /**
     * Add an unload handler that will be called when the SDK is being unloaded
     * @param handler - the handler
     */
    addUnloadCb(handler: UnloadHandler): void;
    /**
     * Flush and send any batched / cached data immediately
     * @param async - send data asynchronously when true (defaults to true)
     * @param callBack - if specified, notify caller when send is complete, the channel should return true to indicate to the caller that it will be called.
     * If the caller doesn't return true the caller should assume that it may never be called.
     * @param sendReason - specify the reason that you are calling "flush" defaults to ManualFlush (1) if not specified
     * @returns - true if the callback will be return after the flush is complete otherwise the caller should assume that any provided callback will never be called
     */
    flush(isAsync?: boolean, callBack?: (flushComplete?: boolean) => void, sendReason?: SendRequestReason): void;
    /**
     * Gets the current distributed trace context for this instance if available
     * @param createNew - Optional flag to create a new instance if one doesn't currently exist, defaults to true
     */
    getTraceCtx(createNew?: boolean): IDistributedTraceContext | null;
    /**
     * Sets the current distributed trace context for this instance if available
     */
    setTraceCtx(newTracectx: IDistributedTraceContext): void;
    /**
     * Add this hook so that it is automatically removed during unloading
     * @param hooks - The single hook or an array of IInstrumentHook objects
     */
    addUnloadHook(hooks: IUnloadHook | IUnloadHook[] | Iterator<IUnloadHook> | ILegacyUnloadHook | ILegacyUnloadHook[] | Iterator<ILegacyUnloadHook>): void;
    /**
     * Watches and tracks changes for accesses to the current config, and if the accessed config changes the
     * handler will be recalled.
     * @param handler
     * @returns A watcher handler instance that can be used to remove itself when being unloaded
     */
    onCfgChange(handler: WatcherFunction<CfgType>): IUnloadHook;
    protected releaseQueue(): void;
    /**
     * Hook for Core extensions to allow them to update their own configuration before updating all of the plugins.
     * @param updateCtx - The plugin update context
     * @param updateState - The Update State
     * @returns boolean - True means the extension class will call updateState otherwise the Core will
     */
    protected _updateHook?(updateCtx: IProcessTelemetryUpdateContext, updateState: ITelemetryUpdateState): void | boolean;
}

export declare function areCookiesSupported(logger?: IDiagnosticLogger): any;

export { arrForEach }

export { arrIndexOf }

export { arrMap }

export { arrReduce }

export { asString }

/**
 * Binds the specified function to an event, so that the function gets called whenever the event fires on the object
 * @param obj - Object to add the event too.
 * @param eventNameWithoutOn - String that specifies any of the standard DHTML Events without "on" prefix and optional (dot "." prefixed) namespaces "click" "click.mynamespace".
 * @param handlerRef - Pointer that specifies the function to call when event fires
 * @param useCapture - [Optional] Defaults to false
 * @returns True if the function was bound successfully to the event, otherwise false
 */
export declare function attachEvent(obj: any, eventNameWithoutOn: string, handlerRef: any, useCapture?: boolean): boolean;

/**
 * BaseTelemetryPlugin provides a basic implementation of the ITelemetryPlugin interface so that plugins
 * can avoid implementation the same set of boiler plate code as well as provide a base
 * implementation so that new default implementations can be added without breaking all plugins.
 */
export declare abstract class BaseTelemetryPlugin implements ITelemetryPlugin {
    identifier: string;
    version?: string;
    /**
     * Holds the core instance that was used during initialization
     */
    core: IAppInsightsCore;
    priority: number;
    /**
     * Call back for telemetry processing before it it is sent
     * @param env - This is the current event being reported
     * @param itemCtx - This is the context for the current request, ITelemetryPlugin instances
     * can optionally use this to access the current core instance or define / pass additional information
     * to later plugins (vs appending items to the telemetry item)
     */
    processNext: (env: ITelemetryItem, itemCtx: IProcessTelemetryContext) => void;
    /**
     * Set next extension for telemetry processing
     */
    setNextPlugin: (next: ITelemetryPlugin | ITelemetryPluginChain) => void;
    /**
     * Returns the current diagnostic logger that can be used to log issues, if no logger is currently
     * assigned a new default one will be created and returned.
     */
    diagLog: (itemCtx?: IProcessTelemetryContext) => IDiagnosticLogger;
    /**
     * Returns whether the plugin has been initialized
     */
    isInitialized: () => boolean;
    /**
     * Helper to return the current IProcessTelemetryContext, if the passed argument exists this just
     * returns that value (helps with minification for callers), otherwise it will return the configured
     * context or a temporary one.
     * @param currentCtx - [Optional] The current execution context
     */
    protected _getTelCtx: (currentCtx?: IProcessTelemetryContext) => IProcessTelemetryContext;
    /**
     * Internal helper to allow setting of the internal initialized setting for inherited instances and unit testing
     */
    protected setInitialized: (isInitialized: boolean) => void;
    /**
     * Teardown / Unload hook to allow implementations to perform some additional unload operations before the BaseTelemetryPlugin
     * finishes it's removal.
     * @param unloadCtx - This is the context that should be used during unloading.
     * @param unloadState - The details / state of the unload process, it holds details like whether it should be unloaded synchronously or asynchronously and the reason for the unload.
     * @param asyncCallback - An optional callback that the plugin must call if it returns true to inform the caller that it has completed any async unload/teardown operations.
     * @returns boolean - true if the plugin has or will call asyncCallback, this allows the plugin to perform any asynchronous operations.
     */
    protected _doTeardown?: (unloadCtx?: IProcessTelemetryUnloadContext, unloadState?: ITelemetryUnloadState, asyncCallback?: () => void) => void | boolean;
    /**
     * Extension hook to allow implementations to perform some additional update operations before the BaseTelemetryPlugin finishes it's removal
     * @param updateCtx - This is the context that should be used during updating.
     * @param updateState - The details / state of the update process, it holds details like the current and previous configuration.
     * @param asyncCallback - An optional callback that the plugin must call if it returns true to inform the caller that it has completed any async update operations.
     * @returns boolean - true if the plugin has or will call asyncCallback, this allows the plugin to perform any asynchronous operations.
     */
    protected _doUpdate?: (updateCtx?: IProcessTelemetryUpdateContext, updateState?: ITelemetryUpdateState, asyncCallback?: () => void) => void | boolean;
    /**
     * Exposes the underlying unload hook container instance for this extension to allow it to be passed down to any sub components of the class.
     * This should NEVER be exposed or called publically as it's scope is for internal use by BaseTelemetryPlugin and any derived class (which is why
     * it's scoped as protected)
     */
    protected readonly _unloadHooks: IUnloadHookContainer;
    constructor();
    initialize(config: IConfiguration, core: IAppInsightsCore, extensions: IPlugin[], pluginChain?: ITelemetryPluginChain): void;
    /**
     * Tear down the plugin and remove any hooked value, the plugin should be removed so that it is no longer initialized and
     * therefore could be re-initialized after being torn down. The plugin should ensure that once this has been called any further
     * processTelemetry calls are ignored and it just calls the processNext() with the provided context.
     * @param unloadCtx - This is the context that should be used during unloading.
     * @param unloadState - The details / state of the unload process, it holds details like whether it should be unloaded synchronously or asynchronously and the reason for the unload.
     * @returns boolean - true if the plugin has or will call processNext(), this for backward compatibility as previously teardown was synchronous and returned nothing.
     */
    teardown(unloadCtx?: IProcessTelemetryUnloadContext, unloadState?: ITelemetryUnloadState): void | boolean;
    abstract processTelemetry(env: ITelemetryItem, itemCtx?: IProcessTelemetryContext): void;
    /**
     * The the plugin should re-evaluate configuration and update any cached configuration settings.
     * @param updateCtx - This is the context that should be used during updating.
     * @param updateState - The details / state of the update process, it holds details like the current and previous configuration.
     * @returns boolean - true if the plugin has or will call updateCtx.processNext(), this allows the plugin to perform any asynchronous operations.
     */
    update(updateCtx: IProcessTelemetryUpdateContext, updateState: ITelemetryUpdateState): void | boolean;
    /**
     * Add an unload handler that will be called when the SDK is being unloaded
     * @param handler - the handler
     */
    protected _addUnloadCb(handler: UnloadHandler): void;
    /**
     * Add this hook so that it is automatically removed during unloading
     * @param hooks - The single hook or an array of IInstrumentHook objects
     */
    protected _addHook(hooks: IUnloadHook | IUnloadHook[] | Iterator<IUnloadHook> | ILegacyUnloadHook | ILegacyUnloadHook[] | Iterator<ILegacyUnloadHook>): void;
}

/**
 * Mark the provided value so that if it's included into the configuration it will NOT have
 * its properties converted into a dynamic (reactive) object. If the object is not a plain object
 * or an array (ie. a class) this function has not affect as only Objects and Arrays are converted
 * into dynamic objects in the dynamic configuration.
 *
 * When you have tagged a value as both {@link forceDynamicConversion} and blocked force will take precedence.
 *
 * You should only need to use this function, if you are creating dynamic "classes" from objects
 * which confirm to the require interface. A common case for this is during unit testing where it's
 * easier to create mock extensions.
 *
 * If `value` is falsy (null / undefined / 0 / empty string etc) it will not be tagged and
 * if there is an exception adding the property to the value (because its frozen etc) the
 * exception will be swallowed
 *
 * @example
 * ```ts
 * // This is a valid "extension", but it is technically an object
 * // So when included in the config.extensions it WILL be cloned and then
 * // converted into a dynamic object, where all of its properties will become
 * // get/set object properties and will be tracked. While this WILL still
 * // function, when attempt to use a mocking framework on top of this the
 * // functions are now technically get accessors which return a function
 * // and this can cause some mocking frameworks to fail.
 * let mockChannel = {
 *      pause: () => { },
 *      resume: () => { },
 *      teardown: () => { },
 *      flush: (async: any, callBack: any) => { },
 *      processTelemetry: (env: any) => { },
 *      setNextPlugin: (next: any) => { },
 *      initialize: (config: any, core: any, extensions: any) => { },
 *      identifier: "testChannel",
 *      priority: 1003
 * };
 * ```
 * @param value - The object that you want to block from being converted into a
 * trackable dynamic object
 * @returns The original value
 */
export declare function blockDynamicConversion<T>(value: T): T;

/**
 * Helper which returns an IConfigDefaultCheck instance identifying that value associated with this property
 * should not have it's properties converted into a dynamic config properties.
 * @param defaultValue - The default value to apply it not provided or it's not valid
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfBlockPropValue<V, T = IConfiguration, C = IConfiguration>(defaultValue: V | IConfigDefaults<V, T>): IConfigDefaultCheck<T, V, C>;

/**
 * Helper which returns an IConfigDefaultCheck instance that will validate and convert the user
 * provided value to a boolean from a string or boolean value
 * @param defaultValue - The default value to apply it not provided or it's not valid
 * @param fallBackName - The fallback configuration name if the current value is not available
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfBoolean<T, C = IConfiguration>(defaultValue?: boolean, fallBackName?: keyof T | keyof C | Array<keyof T | keyof C>): IConfigDefaultCheck<T, boolean, C>;

/**
 * Helper which returns an IConfigDefaultCheck instance that will validate that the user
 * provided value is a function.
 * @param defaultValue - The default value to apply it not provided or it's not valid
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfFunc<V, T, C = IConfiguration>(defaultValue?: V): IConfigDefaultCheck<T, V, C>;

/**
 * Helper which returns an IConfigDefaultCheck instance with the field defined as an object
 * that should be merged
 * @param defaultValue - The default value to apply it not provided or it's not valid
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfMerge<V, T = IConfiguration, C = IConfiguration>(defaultValue: V | IConfigDefaults<V, T>): IConfigDefaultCheck<T, V, C>;

/**
 * Helper which returns an IConfigDefaultCheck instance with the provided field set function
 * @param setter - The IConfigCheckFn function to validate the user provided value
 * @param defaultValue - The default value to apply it not provided or it's not valid
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfSet<V, T, C = IConfiguration>(setter: IConfigSetFn<T, V>, defaultValue: V): IConfigDefaultCheck<T, V, C>;

/**
 * Helper which returns an IConfigDefaultCheck instance that will validate that the user
 * provided value is a function.
 * @param defaultValue - The default string value to apply it not provided or it's not valid, defaults to an empty string
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfString<T, C = IConfiguration>(defaultValue?: string): IConfigDefaultCheck<T, string, C>;

/**
 * Helper which returns an IConfigDefaultCheck instance with the provided field validator
 * @param validator - The IConfigCheckFn function to validate the user provided value
 * @param defaultValue - The default value to apply it not provided or it's not valid
 * @param fallBackName - The fallback configuration name if the current value is not available
 * @returns a new IConfigDefaultCheck structure
 */
export declare function cfgDfValidate<V, T, C = IConfiguration>(validator: IConfigCheckFn<V>, defaultValue: V, fallBackName?: keyof T | keyof C | Array<keyof T | keyof C>): IConfigDefaultCheck<T, V, C>;

/**
 * Simpler helper to create a dynamic class that implements the interface and populates the values with the defaults.
 * Only instance properties (hasOwnProperty) values are copied from the defaults to the new instance
 * @param defaults - Simple helper
 */
export declare function createClassFromInterface<T>(defaults?: T): new () => T;

export declare function createCookieMgr(rootConfig?: IConfiguration, logger?: IDiagnosticLogger): ICookieMgr;

/**
 * Create or return a dynamic version of the passed config, if it is not already dynamic
 * @param config - The config to be converted into a dynamic config
 * @param defaultConfig - The default values to apply on the config if the properties don't already exist
 * @param inPlace - Should the config be converted in-place into a dynamic config or a new instance returned, defaults to true
 * @returns The dynamic config handler for the config (whether new or existing)
 */
export declare function createDynamicConfig<T = IConfiguration>(config: T, defaultConfig?: IConfigDefaults<T>, logger?: IDiagnosticLogger, inPlace?: boolean): IDynamicConfigHandler<T>;

/**
 * Create an enum style object which has both the key => value and value => key mappings
 * @param values - The values to populate on the new object
 * @returns
 */
export declare const createEnumStyle: <E>(values: {
    [key in keyof E]: E[keyof E];
}) => EnumValue<E>;

/**
 * Creates a new Telemetry Item context with the current config, core and plugin execution chain
 * @param plugins - The plugin instances that will be executed
 * @param config - The current config
 * @param core - The current core instance
 * @param startAt - Identifies the next plugin to execute, if null there is no "next" plugin and if undefined it should assume the start of the chain
 */
export declare function createProcessTelemetryContext(telemetryChain: ITelemetryPluginChain | null, cfg: IConfiguration, core: IAppInsightsCore, startAt?: IPlugin): IProcessTelemetryContext;

/**
 * Create a new ITraceParent instance using the provided values.
 * @param traceId - The traceId to use, when invalid a new random W3C id will be generated.
 * @param spanId - The parent/span id to use, a new random value will be generated if it is invalid.
 * @param flags - The traceFlags to use, defaults to zero (0) if not supplied or invalid
 * @param version - The version to used, defaults to version "01" if not supplied or invalid.
 * @returns
 */
export declare function createTraceParent(traceId?: string, spanId?: string, flags?: number, version?: string): ITraceParent;

export declare function createUniqueNamespace(name: string, includeVersion?: boolean): string;

export declare function createUnloadHandlerContainer(): IUnloadHandlerContainer;

/**
 * Create a IUnloadHookContainer which can be used to remember unload hook functions to be executed during the component unloading
 * process.
 * @returns A new IUnloadHookContainer instance
 */
export declare function createUnloadHookContainer(): IUnloadHookContainer;

/**
 * Create a 2 index map that maps an enum's key and value to the defined map value, X["key"] => mapValue and X[0] => mapValue.
 * Generic values
 * - E = the const enum type (typeof eRequestHeaders);
 * - V = Identifies the valid values for the keys, this should include both the enum numeric and string key of the type. The
 * resulting "Value" of each entry identifies the valid values withing the assignments.
 * @param values - The values to populate on the new object
 * @returns
 */
export declare const createValueMap: <E, V = E>(values: {
    [key in keyof E]: [E[keyof E], V[keyof V]];
}) => V;

export { dateNow }

export { deepFreeze }

/**
 * Removes an event handler for the specified event
 * @param Object - to remove the event from
 * @param eventNameWithoutOn - {string} - The name of the event, with optional namespaces or just the namespaces,
 * such as "click", "click.mynamespace" or ".mynamespace"
 * @param handlerRef - {any} - The callback function that needs to be removed from the given event, when using a
 * namespace (with or without a qualifying event) this may be null to remove all previously attached event handlers
 * otherwise this will only remove events with this specific handler.
 * @param useCapture - [Optional] Defaults to false
 */
export declare function detachEvent(obj: any, eventNameWithoutOn: string, handlerRef: any, useCapture?: boolean): void;

export declare class DiagnosticLogger implements IDiagnosticLogger {
    identifier: string;
    /**
     * The internal logging queue
     */
    queue: _InternalLogMessage[];
    constructor(config?: IConfiguration);
    /**
     * 0: OFF (default)
     * 1: CRITICAL
     * 2: >= WARNING
     */
    consoleLoggingLevel(): number;
    /**
     * This method will throw exceptions in debug mode or attempt to log the error as a console warning.
     * @param severity - {LoggingSeverity} - The severity of the log message
     * @param message - {_InternalLogMessage} - The log message.
     */
    throwInternal(severity: LoggingSeverity, msgId: _InternalMessageId, msg: string, properties?: Object, isUserAct?: boolean): void;
    /**
     * This will write a debug message to the console if possible
     * @param message - {string} - The debug message
     */
    debugToConsole(message: string): void;
    /**
     * This will write a warning to the console if possible
     * @param message - {string} - The warning message
     */
    warnToConsole(message: string): void;
    /**
     * This will write an error to the console if possible
     * @param message - {string} - The warning message
     */
    errorToConsole(message: string): void;
    /**
     * Resets the internal message count
     */
    resetInternalMessageCount(): void;
    /**
     * Logs a message to the internal queue.
     * @param severity - {LoggingSeverity} - The severity of the log message
     * @param message - {_InternalLogMessage} - The message to log.
     */
    logInternalMessage(severity: LoggingSeverity, message: _InternalLogMessage): void;
    /**
     * Unload and remove any state that this IDiagnosticLogger may be holding, this is generally called when the
     * owning SDK is being unloaded.
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @return If the unload occurs synchronously then nothing should be returned, if happening asynchronously then
     * the function should return an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * / Promise to allow any listeners to wait for the operation to complete.
     */
    unload(isAsync?: boolean): void | IPromise<void>;
}

/**
 * Helper function to wrap a function with a perf event
 * @param mgrSource - The Performance Manager or a Performance provider source (may be null)
 * @param getSource - The callback to create the source name for the event (if perf monitoring is enabled)
 * @param func - The function to call and measure
 * @param details - A function to return the payload details
 * @param isAsync - Is the event / function being call asynchronously or synchronously
 */
export declare function doPerf<T>(mgrSource: IPerfManagerProvider | IPerfManager, getSource: () => string, func: (perfEvt?: IPerfEvent) => T, details?: () => any, isAsync?: boolean): T;

/**
 * Call the unload function on all targets handling any returned [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
 * / Promise before calling the next targets unload
 * @param targets - An array of the targets to unload
 * @param isAsync - The caller identifies whether it is expecting the operations to complete synchronously or asynchronously.  Even
 * if the caller is not waiting the operation may still be performed asynchronously depending on the component and the reverse is
 * also true.
 * @param done - Optional callback function to call once all of the unload functions have been called.
 */
export declare function doUnloadAll<T>(targets: Array<{
    unload?: (isAsync?: boolean) => T | IPromise<T>;
}>, isAsync?: boolean, done?: () => void): void | IPromise<void>;

export { dumpObj }

/**
 * The eEventsDiscardedReason enumeration contains a set of values that specify the reason for discarding an event.
 */
export declare const enum eEventsDiscardedReason {
    /**
     * Unknown.
     */
    Unknown = 0,
    /**
     * Status set to non-retryable.
     */
    NonRetryableStatus = 1,
    /**
     * The event is invalid.
     */
    InvalidEvent = 2,
    /**
     * The size of the event is too large.
     */
    SizeLimitExceeded = 3,
    /**
     * The server is not accepting events from this instrumentation key.
     */
    KillSwitch = 4,
    /**
     * The event queue is full.
     */
    QueueFull = 5
}

export declare const enum _eInternalMessageId {
    BrowserDoesNotSupportLocalStorage = 0,
    BrowserCannotReadLocalStorage = 1,
    BrowserCannotReadSessionStorage = 2,
    BrowserCannotWriteLocalStorage = 3,
    BrowserCannotWriteSessionStorage = 4,
    BrowserFailedRemovalFromLocalStorage = 5,
    BrowserFailedRemovalFromSessionStorage = 6,
    CannotSendEmptyTelemetry = 7,
    ClientPerformanceMathError = 8,
    ErrorParsingAISessionCookie = 9,
    ErrorPVCalc = 10,
    ExceptionWhileLoggingError = 11,
    FailedAddingTelemetryToBuffer = 12,
    FailedMonitorAjaxAbort = 13,
    FailedMonitorAjaxDur = 14,
    FailedMonitorAjaxOpen = 15,
    FailedMonitorAjaxRSC = 16,
    FailedMonitorAjaxSend = 17,
    FailedMonitorAjaxGetCorrelationHeader = 18,
    FailedToAddHandlerForOnBeforeUnload = 19,
    FailedToSendQueuedTelemetry = 20,
    FailedToReportDataLoss = 21,
    FlushFailed = 22,
    MessageLimitPerPVExceeded = 23,
    MissingRequiredFieldSpecification = 24,
    NavigationTimingNotSupported = 25,
    OnError = 26,
    SessionRenewalDateIsZero = 27,
    SenderNotInitialized = 28,
    StartTrackEventFailed = 29,
    StopTrackEventFailed = 30,
    StartTrackFailed = 31,
    StopTrackFailed = 32,
    TelemetrySampledAndNotSent = 33,
    TrackEventFailed = 34,
    TrackExceptionFailed = 35,
    TrackMetricFailed = 36,
    TrackPVFailed = 37,
    TrackPVFailedCalc = 38,
    TrackTraceFailed = 39,
    TransmissionFailed = 40,
    FailedToSetStorageBuffer = 41,
    FailedToRestoreStorageBuffer = 42,
    InvalidBackendResponse = 43,
    FailedToFixDepricatedValues = 44,
    InvalidDurationValue = 45,
    TelemetryEnvelopeInvalid = 46,
    CreateEnvelopeError = 47,
    CannotSerializeObject = 48,
    CannotSerializeObjectNonSerializable = 49,
    CircularReferenceDetected = 50,
    ClearAuthContextFailed = 51,
    ExceptionTruncated = 52,
    IllegalCharsInName = 53,
    ItemNotInArray = 54,
    MaxAjaxPerPVExceeded = 55,
    MessageTruncated = 56,
    NameTooLong = 57,
    SampleRateOutOfRange = 58,
    SetAuthContextFailed = 59,
    SetAuthContextFailedAccountName = 60,
    StringValueTooLong = 61,
    StartCalledMoreThanOnce = 62,
    StopCalledWithoutStart = 63,
    TelemetryInitializerFailed = 64,
    TrackArgumentsNotSpecified = 65,
    UrlTooLong = 66,
    SessionStorageBufferFull = 67,
    CannotAccessCookie = 68,
    IdTooLong = 69,
    InvalidEvent = 70,
    FailedMonitorAjaxSetRequestHeader = 71,
    SendBrowserInfoOnUserInit = 72,
    PluginException = 73,
    NotificationException = 74,
    SnippetScriptLoadFailure = 99,
    InvalidInstrumentationKey = 100,
    CannotParseAiBlobValue = 101,
    InvalidContentBlob = 102,
    TrackPageActionEventFailed = 103,
    FailedAddingCustomDefinedRequestContext = 104,
    InMemoryStorageBufferFull = 105,
    InstrumentationKeyDeprecation = 106,
    ConfigWatcherException = 107,
    DynamicConfigException = 108
}

export declare const enum eLoggingSeverity {
    /**
     * No Logging will be enabled
     */
    DISABLED = 0,
    /**
     * Error will be sent as internal telemetry
     */
    CRITICAL = 1,
    /**
     * Error will NOT be sent as internal telemetry, and will only be shown in browser console
     */
    WARNING = 2,
    /**
     * The Error will NOT be sent as an internal telemetry, and will only be shown in the browser
     * console if the logging level allows it.
     */
    DEBUG = 3
}

export declare type EnumValue<E = any> = EnumCls<E>;

/**
 * Removes an event handler for the specified event
 * @param Object - to remove the event from
 * @param eventName - {string} - The name of the event, with optional namespaces or just the namespaces,
 * such as "click", "click.mynamespace" or ".mynamespace"
 * @param handlerRef - {any} - The callback function that needs to be removed from the given event, when using a
 * namespace (with or without a qualifying event) this may be null to remove all previously attached event handlers
 * otherwise this will only remove events with this specific handler.
 * @param evtNamespace - [Optional] Additional namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace,
 * if the eventName also includes a namespace the namespace(s) are merged into a single namespace
 * @param useCapture - [Optional] Defaults to false
 */
export declare function eventOff<T>(target: T, eventName: string, handlerRef: any, evtNamespace?: string | string[] | null, useCapture?: boolean): void;

/**
 * Binds the specified function to an event, so that the function gets called whenever the event fires on the object
 * @param obj - Object to add the event too.
 * @param eventName - String that specifies any of the standard DHTML Events without "on" prefix, if may also include an optional (dot "." prefixed)
 * namespaces "click" "click.mynamespace" in addition to specific namespaces.
 * @param handlerRef - Pointer that specifies the function to call when event fires
 * @param evtNamespace - [Optional] Additional namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace,
 * if the eventName also includes a namespace the namespace(s) are merged into a single namespace
 * @param useCapture - [Optional] Defaults to false
 * @returns True if the function was bound successfully to the event, otherwise false
 */
export declare function eventOn<T>(target: T, eventName: string, handlerRef: any, evtNamespace?: string | string[] | null, useCapture?: boolean): boolean;

/**
 * The EventsDiscardedReason enumeration contains a set of values that specify the reason for discarding an event.
 */
export declare const EventsDiscardedReason: EnumValue<typeof eEventsDiscardedReason>;

export declare type EventsDiscardedReason = number | eEventsDiscardedReason;

/**
 * Helper function to fetch the named meta-tag from the page.
 * @param name
 */
export declare function findMetaTag(name: string): any;

/**
 * Helper function to fetch the named server timing value from the page response (first navigation event).
 * @param name
 */
export declare function findNamedServerTiming(name: string): any;

/**
 * Helper function to fetch the passed traceparent from the page, looking for it as a meta-tag or a Server-Timing header.
 * @returns
 */
export declare function findW3cTraceParent(): ITraceParent;

/**
 * This is the reverse case of {@link blockDynamicConversion} in that this will tag an
 * object to indicate that it should always be converted into a dynamic trackable object
 * even when not an object or array. So all properties of this object will become
 * get / set accessor functions.
 *
 * When you have tagged a value as both {@link forceDynamicConversion} and blocked force will take precedence.
 *
 * If `value` is falsy (null / undefined / 0 / empty string etc) it will not be tagged and
 * if there is an exception adding the property to the value (because its frozen etc) the
 * exception will be swallowed.
 * @param value - The object that should be tagged and converted if included into a dynamic
 * configuration.
 * @returns The original value
 */
export declare function forceDynamicConversion<T>(value: T): T;

/**
 * Format the ITraceParent value as a string using the supported and know version formats.
 * So even if the passed traceParent is a later version the string value returned from this
 * function will convert it to only the known version formats.
 * This currently only supports version "00" and invalid "ff"
 * @param value - The parsed traceParent value
 * @returns
 */
export declare function formatTraceParent(value: ITraceParent): string;

/**
 * generate W3C trace id
 */
export declare function generateW3CId(): string;

/**
 * Returns the global console object
 */
export declare function getConsole(): Console | null;

/**
 * Returns the crypto object if it is present otherwise null.
 * This helper is used to access the crypto object from the current
 * global instance which could be window or globalThis for a web worker
 */
export declare function getCrypto(): Crypto | null;

export declare function getDebugExt(config: IConfiguration): IDbgExtension;

export declare function getDebugListener(config: IConfiguration): INotificationListener;

export { getDocument }

/**
 * @internal
 * Get the dynamic config handler if the value is already dynamic
 * @param value
 * @returns
 */
export declare function getDynamicConfigHandler<T = IConfiguration, V = IConfiguration>(value: V | IDynamicConfigHandler<T>): IDynamicConfigHandler<T> | null;

/**
 * Returns the name of object if it's an Error. Otherwise, returns empty string.
 */
export declare function getExceptionName(object: any): string;

/**
 * Get the current global performance manager that will be used with no performance manager is supplied.
 * @returns - The current default manager
 */
export declare function getGblPerfMgr(): IPerfManager;

export { getGlobal }

export { getGlobalInst }

export { getHistory }

/**
 * Gets IE version returning the document emulation mode if we are running on IE, or null otherwise
 */
export declare function getIEVersion(userAgentStr?: string): number;

/**
 * Returns the global JSON object if it is present otherwise null.
 * This helper is used to access the JSON object without causing an exception
 * "Uncaught ReferenceError: JSON is not defined"
 */
export declare function getJSON(): JSON | null;

/**
 * Returns the global location object if it is present otherwise null.
 * This helper is used to access the location object without causing an exception
 * "Uncaught ReferenceError: location is not defined"
 */
export declare function getLocation(checkForMock?: boolean): Location | null;

/**
 * Returns the crypto object if it is present otherwise null.
 * This helper is used to access the crypto object from the current
 * global instance which could be window or globalThis for a web worker
 */
export declare function getMsCrypto(): Crypto | null;

export { getNavigator }

export { getPerformance }

/**
 * Returns the current value from the target object if not null or undefined otherwise sets the new value and returns it
 * @param target - The target object to return or set the default value
 * @param field - The key for the field to set on the target
 * @param defValue - [Optional] The value to set if not already present, when not provided a empty object will be added
 */
export declare function getSetValue<T, K extends keyof T>(target: T, field: K, defValue?: T[K]): T[K];

export { getWindow }

export { hasDocument }

export { hasHistory }

/**
 * Checks if JSON object is available, this is required as we support the API running without a
 * window /document (eg. Node server, electron webworkers) and if we attempt to assign a history
 * object to a local variable or pass as an argument an "Uncaught ReferenceError: JSON is not defined"
 * exception will be thrown.
 * Defined as a function to support lazy / late binding environments.
 */
export declare function hasJSON(): boolean;

export { hasNavigator }

export { hasOwnProperty }

export { hasWindow }

export declare interface IAppInsightsCore<CfgType extends IConfiguration = IConfiguration> extends IPerfManagerProvider {
    readonly config: CfgType;
    /**
     * The current logger instance for this instance.
     */
    readonly logger: IDiagnosticLogger;
    /**
     * An array of the installed plugins that provide a version
     */
    readonly pluginVersionStringArr: string[];
    /**
     * The formatted string of the installed plugins that contain a version number
     */
    readonly pluginVersionString: string;
    /**
     * Returns a value that indicates whether the instance has already been previously initialized.
     */
    isInitialized?: () => boolean;
    initialize(config: CfgType, extensions: IPlugin[], logger?: IDiagnosticLogger, notificationManager?: INotificationManager): void;
    getChannels(): IChannelControls[];
    track(telemetryItem: ITelemetryItem): void;
    /**
     * Get the current notification manager
     */
    getNotifyMgr(): INotificationManager;
    /**
     * Get the current cookie manager for this instance
     */
    getCookieMgr(): ICookieMgr;
    /**
     * Set the current cookie manager for this instance
     * @param cookieMgr - The manager, if set to null/undefined will cause the default to be created
     */
    setCookieMgr(cookieMgr: ICookieMgr): void;
    /**
     * Adds a notification listener. The SDK calls methods on the listener when an appropriate notification is raised.
     * The added plugins must raise notifications. If the plugins do not implement the notifications, then no methods will be
     * called.
     * @param listener - An INotificationListener object.
     */
    addNotificationListener?(listener: INotificationListener): void;
    /**
     * Removes all instances of the listener.
     * @param listener - INotificationListener to remove.
     */
    removeNotificationListener?(listener: INotificationListener): void;
    /**
     * Add a telemetry processor to decorate or drop telemetry events.
     * @param telemetryInitializer - The Telemetry Initializer function
     * @returns - A ITelemetryInitializerHandler to enable the initializer to be removed
     */
    addTelemetryInitializer(telemetryInitializer: TelemetryInitializerFunction): ITelemetryInitializerHandler;
    pollInternalLogs?(eventName?: string): ITimerHandler;
    stopPollingInternalLogs?(): void;
    /**
     * Return a new instance of the IProcessTelemetryContext for processing events
     */
    getProcessTelContext(): IProcessTelemetryContext;
    /**
     * Unload and Tear down the SDK and any initialized plugins, after calling this the SDK will be considered
     * to be un-initialized and non-operational, re-initializing the SDK should only be attempted if the previous
     * unload call return `true` stating that all plugins reported that they also unloaded, the recommended
     * approach is to create a new instance and initialize that instance.
     * This is due to possible unexpected side effects caused by plugins not supporting unload / teardown, unable
     * to successfully remove any global references or they may just be completing the unload process asynchronously.
     * If you pass isAsync as `true` (also the default) and DO NOT pass a callback function then an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will be returned which will resolve once the unload is complete. The actual implementation of the `IPromise`
     * will be a native Promise (if supported) or the default as supplied by [ts-async library](https://github.com/nevware21/ts-async)
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @param unloadComplete - An optional callback that will be called once the unload has completed
     * @param cbTimeout - An optional timeout to wait for any flush operations to complete before proceeding with the
     * unload. Defaults to 5 seconds.
     * @return Nothing or if occurring asynchronously a [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * which will be resolved once the unload is complete, the [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will only be returned when no callback is provided and isAsync is true
     */
    unload(isAsync?: boolean, unloadComplete?: (unloadState: ITelemetryUnloadState) => void, cbTimeout?: number): void | IPromise<ITelemetryUnloadState>;
    /**
     * Find and return the (first) plugin with the specified identifier if present
     * @param pluginIdentifier
     */
    getPlugin<T extends IPlugin = IPlugin>(pluginIdentifier: string): ILoadedPlugin<T>;
    /**
     * Add a new plugin to the installation
     * @param plugin - The new plugin to add
     * @param replaceExisting - should any existing plugin be replaced, default is false
     * @param doAsync - Should the add be performed asynchronously
     * @param addCb - [Optional] callback to call after the plugin has been added
     */
    addPlugin<T extends IPlugin = ITelemetryPlugin>(plugin: T, replaceExisting?: boolean, doAsync?: boolean, addCb?: (added?: boolean) => void): void;
    /**
     * Update the configuration used and broadcast the changes to all loaded plugins, this does NOT support updating, adding or removing
     * any the plugins (extensions or channels). It will notify each plugin (if supported) that the configuration has changed but it will
     * not remove or add any new plugins, you need to call addPlugin or getPlugin(identifier).remove();
     * @param newConfig - The new configuration is apply
     * @param mergeExisting - Should the new configuration merge with the existing or just replace it. Default is to merge.
     */
    updateCfg(newConfig: CfgType, mergeExisting?: boolean): void;
    /**
     * Returns the unique event namespace that should be used when registering events
     */
    evtNamespace(): string;
    /**
     * Add a handler that will be called when the SDK is being unloaded
     * @param handler - the handler
     */
    addUnloadCb(handler: UnloadHandler): void;
    /**
     * Add this hook so that it is automatically removed during unloading
     * @param hooks - The single hook or an array of IInstrumentHook objects
     */
    addUnloadHook(hooks: IUnloadHook | IUnloadHook[] | Iterator<IUnloadHook> | ILegacyUnloadHook | ILegacyUnloadHook[] | Iterator<ILegacyUnloadHook>): void;
    /**
     * Flush and send any batched / cached data immediately
     * @param async - send data asynchronously when true (defaults to true)
     * @param callBack - if specified, notify caller when send is complete, the channel should return true to indicate to the caller that it will be called.
     * If the caller doesn't return true the caller should assume that it may never be called.
     * @param sendReason - specify the reason that you are calling "flush" defaults to ManualFlush (1) if not specified
     * @param cbTimeout - An optional timeout to wait for any flush operations to complete before proceeding with the unload. Defaults to 5 seconds.
     * @returns - true if the callback will be return after the flush is complete otherwise the caller should assume that any provided callback will never be called
     */
    flush(isAsync?: boolean, callBack?: (flushComplete?: boolean) => void, sendReason?: SendRequestReason, cbTimeout?: number): boolean | void;
    /**
     * Gets the current distributed trace context for this instance if available
     * @param createNew - Optional flag to create a new instance if one doesn't currently exist, defaults to true
     */
    getTraceCtx(createNew?: boolean): IDistributedTraceContext | null;
    /**
     * Sets the current distributed trace context for this instance if available
     */
    setTraceCtx(newTraceCtx: IDistributedTraceContext | null | undefined): void;
    /**
     * Watches and tracks changes for accesses to the current config, and if the accessed config changes the
     * handler will be recalled.
     * @param handler
     * @returns A watcher handler instance that can be used to remove itself when being unloaded
     */
    onCfgChange(handler: WatcherFunction<CfgType>): IUnloadHook;
    /**
     * Function used to identify the get w parameter used to identify status bit to some channels
     */
    getWParam: () => number;
}

export declare interface IBaseProcessingContext {
    /**
     * The current core instance for the request
     */
    core: () => IAppInsightsCore;
    /**
     * THe current diagnostic logger for the request
     */
    diagLog: () => IDiagnosticLogger;
    /**
     * Gets the current core config instance
     */
    getCfg: () => IConfiguration;
    /**
     * Gets the named extension config
     */
    getExtCfg: <T>(identifier: string, defaultValue?: IConfigDefaults<T>) => T;
    /**
     * Gets the named config from either the named identifier extension or core config if neither exist then the
     * default value is returned
     * @param identifier - The named extension identifier
     * @param field - The config field name
     * @param defaultValue - The default value to return if no defined config exists
     */
    getConfig: (identifier: string, field: string, defaultValue?: number | string | boolean | string[] | RegExp[] | Function) => number | string | boolean | string[] | RegExp[] | Function;
    /**
     * Helper to allow plugins to check and possibly shortcut executing code only
     * required if there is a nextPlugin
     */
    hasNext: () => boolean;
    /**
     * Returns the next configured plugin proxy
     */
    getNext: () => ITelemetryPluginChain;
    /**
     * Helper to set the next plugin proxy
     */
    setNext: (nextCtx: ITelemetryPluginChain) => void;
    /**
     * Synchronously iterate over the context chain running the callback for each plugin, once
     * every plugin has been executed via the callback, any associated onComplete will be called.
     * @param callback - The function call for each plugin in the context chain
     */
    iterate: <T extends ITelemetryPlugin = ITelemetryPlugin>(callback: (plugin: T) => void) => void;
    /**
     * Set the function to call when the current chain has executed all processNext or unloadNext items.
     * @param onComplete - The onComplete to call
     * @param that - The "this" value to use for the onComplete call, if not provided or undefined defaults to the current context
     * @param args - Any additional arguments to pass to the onComplete function
     */
    onComplete: (onComplete: () => void, that?: any, ...args: any[]) => void;
    /**
     * Create a new context using the core and config from the current instance, returns a new instance of the same type
     * @param plugins - The execution order to process the plugins, if null or not supplied
     *                  then the current execution order will be copied.
     * @param startAt - The plugin to start processing from, if missing from the execution
     *                  order then the next plugin will be NOT set.
     */
    createNew: (plugins?: IPlugin[] | ITelemetryPluginChain, startAt?: IPlugin) => IBaseProcessingContext;
}

/**
 * Provides data transmission capabilities
 */
export declare interface IChannelControls extends ITelemetryPlugin {
    /**
     * Pause sending data
     */
    pause?(): void;
    /**
     * Resume sending data
     */
    resume?(): void;
    /**
     * Tear down the plugin and remove any hooked value, the plugin should be removed so that it is no longer initialized and
     * therefore could be re-initialized after being torn down. The plugin should ensure that once this has been called any further
     * processTelemetry calls are ignored and it just calls the processNext() with the provided context.
     * @param unloadCtx - This is the context that should be used during unloading.
     * @param unloadState - The details / state of the unload process, it holds details like whether it should be unloaded synchronously or asynchronously and the reason for the unload.
     * @returns boolean - true if the plugin has or will call processNext(), this for backward compatibility as previously teardown was synchronous and returned nothing.
     */
    teardown?: (unloadCtx?: IProcessTelemetryUnloadContext, unloadState?: ITelemetryUnloadState) => void | boolean;
    /**
     * Flush to send data immediately; channel should default to sending data asynchronously. If executing asynchronously and
     * you DO NOT pass a callback function then a [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will be returned which will resolve once the flush is complete. The actual implementation of the `IPromise`
     * will be a native Promise (if supported) or the default as supplied by [ts-async library](https://github.com/nevware21/ts-async)
     * @param async - send data asynchronously when true
     * @param callBack - if specified, notify caller when send is complete, the channel should return true to indicate to the caller that it will be called.
     * If the caller doesn't return true the caller should assume that it may never be called.
     * @param sendReason - specify the reason that you are calling "flush" defaults to ManualFlush (1) if not specified
     * @returns - If a callback is provided `true` to indicate that callback will be called after the flush is complete otherwise the caller
     * should assume that any provided callback will never be called, Nothing or if occurring asynchronously a
     * [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) which will be resolved once the unload is complete,
     * the [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) will only be returned when no callback is provided
     * and async is true.
     */
    flush?(async: boolean, callBack?: (flushComplete?: boolean) => void, sendReason?: SendRequestReason): boolean | void | IPromise<boolean>;
}

export declare interface IChannelControlsHost extends IChannelControls {
    /**
     * Get and return the named channel instance (if present) from the queues
     * @param pluginIdentifier - The identifier name of the plugin
     */
    getChannel<T extends IPlugin = IPlugin>(pluginIdentifier: string): T;
}

/**
 * The type to identify whether the default value should be applied in preference to the provided value.
 */
export declare type IConfigCheckFn<V> = (value: V) => boolean;

/**
 * The default values with a check function
 */
export declare interface IConfigDefaultCheck<T, V, C = IConfiguration> {
    /**
     * Callback function to check if the user-supplied value is valid, if not the default will be applied
     */
    isVal?: IConfigCheckFn<V>;
    /**
     * Optional function to allow converting and setting of the default value
     */
    set?: IConfigSetFn<T, V>;
    /**
     * The default value to apply if the user-supplied value is not valid
     */
    v?: V | IConfigDefaults<V, T>;
    /**
     *  The default fallback key if the main key is not present, this is the key value from the config
     */
    fb?: keyof T | keyof C | Array<keyof T | keyof C>;
    /**
     * Use this check to determine the default fallback, default only checked whether the property isDefined,
     * therefore `null`; `""` are considered to be valid values.
     */
    dfVal?: (value: any) => boolean;
    /**
     * Specify that any provided value should have the default value(s) merged into the value rather than
     * just using either the default of user provided values. Mergeed objects will automatically be marked
     * as referenced.
     */
    mrg?: boolean;
    /**
     * Set this field of the target as referenced, which will cause any object or array instance
     * to be updated in-place rather than being entirely replaced. All other values will continue to be replaced.
     * This is required for nested default objects to avoid multiple repetitive updates to listeners
     * @returns The referenced properties current value
     */
    ref?: boolean;
    /**
     * Set this field of the target as read-only, which will block this single named property from
     * ever being changed for the target instance.
     * This does NOT freeze or seal the instance, it just stops the direct re-assignment of the named property,
     * if the value is a non-primitive (ie. an object or array) it's properties will still be mutable.
     * @returns The referenced properties current value
     */
    rdOnly?: boolean;
    /**
     * Block the value associated with this property from having it's properties / values converted into
     * dynamic properties, this is generally used to block objects or arrays provided by external libraries
     * which may be a plain object with readonly (non-configurable) or const properties.
     */
    blkVal?: boolean;
}

/**
 * The Type definition to define default values to be applied to the config
 * The value may be either the direct value or a ConfigDefaultCheck definition
 */
export declare type IConfigDefaults<T, C = IConfiguration> = {
    [key in keyof T]: T[key] | IConfigDefaultCheck<T, T[key], C>;
};

/**
 * The type which identifies the function use to validate the user supplied value
 */
export declare type IConfigSetFn<T, V> = (value: any, defValue: V, theConfig: T) => V;

/**
 * Configuration provided to SDK core
 */
export declare interface IConfiguration {
    /**
     * Instrumentation key of resource. Either this or connectionString must be specified.
     */
    instrumentationKey?: string;
    /**
     * Connection string of resource. Either this or instrumentationKey must be specified.
     */
    connectionString?: string;
    /**
     * Set the timer interval (in ms) for internal logging queue, this is the
     * amount of time to wait after logger.queue messages are detected to be sent.
     * Note: since 3.0.1 and 2.8.13 the diagnostic logger timer is a normal timeout timer
     * and not an interval timer. So this now represents the timer "delay" and not
     * the frequency at which the events are sent.
     */
    diagnosticLogInterval?: number;
    /**
     * Maximum number of iKey transmitted logging telemetry per page view
     */
    maxMessageLimit?: number;
    /**
     * Console logging level. All logs with a severity level higher
     * than the configured level will be printed to console. Otherwise
     * they are suppressed. ie Level 2 will print both CRITICAL and
     * WARNING logs to console, level 1 prints only CRITICAL.
     *
     * Note: Logs sent as telemetry to instrumentation key will also
     * be logged to console if their severity meets the configured loggingConsoleLevel
     *
     * 0: ALL console logging off
     * 1: logs to console: severity >= CRITICAL
     * 2: logs to console: severity >= WARNING
     */
    loggingLevelConsole?: number;
    /**
     * Telemtry logging level to instrumentation key. All logs with a severity
     * level higher than the configured level will sent as telemetry data to
     * the configured instrumentation key.
     *
     * 0: ALL iKey logging off
     * 1: logs to iKey: severity >= CRITICAL
     * 2: logs to iKey: severity >= WARNING
     */
    loggingLevelTelemetry?: number;
    /**
     * If enabled, uncaught exceptions will be thrown to help with debugging
     */
    enableDebug?: boolean;
    /**
     * Endpoint where telemetry data is sent
     */
    endpointUrl?: string;
    /**
     * Extension configs loaded in SDK
     */
    extensionConfig?: {
        [key: string]: any;
    };
    /**
     * Additional plugins that should be loaded by core at runtime
     */
    readonly extensions?: ITelemetryPlugin[];
    /**
     * Channel queues that is setup by caller in desired order.
     * If channels are provided here, core will ignore any channels that are already setup, example if there is a SKU with an initialized channel
     */
    readonly channels?: IChannelControls[][];
    /**
     * @type {boolean}
     * Flag that disables the Instrumentation Key validation.
     */
    disableInstrumentationKeyValidation?: boolean;
    /**
     * [Optional] When enabled this will create local perfEvents based on sections of the code that have been instrumented
     * to emit perfEvents (via the doPerf()) when this is enabled. This can be used to identify performance issues within
     * the SDK, the way you are using it or optionally your own instrumented code.
     * The provided IPerfManager implementation does NOT send any additional telemetry events to the server it will only fire
     * the new perfEvent() on the INotificationManager which you can listen to.
     * This also does not use the window.performance API, so it will work in environments where this API is not supported.
     */
    enablePerfMgr?: boolean;
    /**
     * [Optional] Callback function that will be called to create a the IPerfManager instance when required and ```enablePerfMgr```
     * is enabled, this enables you to override the default creation of a PerfManager() without needing to ```setPerfMgr()```
     * after initialization.
     */
    createPerfMgr?: (core: IAppInsightsCore, notificationManager: INotificationManager) => IPerfManager;
    /**
     * [Optional] Fire every single performance event not just the top level root performance event. Defaults to false.
     */
    perfEvtsSendAll?: boolean;
    /**
     * [Optional] Identifies the default length used to generate random session and user id's if non currently exists for the user / session.
     * Defaults to 22, previous default value was 5, if you need to keep the previous maximum length you should set this value to 5.
     */
    idLength?: number;
    /**
     * @description Custom cookie domain. This is helpful if you want to share Application Insights cookies across subdomains. It
     * can be set here or as part of the cookieCfg.domain, the cookieCfg takes precedence if both are specified.
     * @type {string}
     * @defaultValue ""
     */
    cookieDomain?: string;
    /**
     * @description Custom cookie path. This is helpful if you want to share Application Insights cookies behind an application
     * gateway. It can be set here or as part of the cookieCfg.domain, the cookieCfg takes precedence if both are specified.
     * @type {string}
     * @defaultValue ""
     */
    cookiePath?: string;
    /**
     * [Optional] A boolean that indicated whether to disable the use of cookies by the SDK. If true, the SDK will not store or
     * read any data from cookies. Cookie usage can be re-enabled after initialization via the core.getCookieMgr().enable().
     */
    disableCookiesUsage?: boolean;
    /**
     * [Optional] A Cookie Manager configuration which includes hooks to allow interception of the get, set and delete cookie
     * operations. If this configuration is specified any specified enabled and domain properties will take precedence over the
     * cookieDomain and disableCookiesUsage values.
     */
    cookieCfg?: ICookieMgrConfig;
    /**
     * [Optional] An array of the page unload events that you would like to be ignored, special note there must be at least one valid unload
     * event hooked, if you list all or the runtime environment only supports a listed "disabled" event it will still be hooked, if required by the SDK.
     * Unload events include "beforeunload", "unload", "visibilitychange" (with 'hidden' state) and "pagehide"
     */
    disablePageUnloadEvents?: string[];
    /**
     * [Optional] An array of page show events that you would like to be ignored, special note there must be at lease one valid show event
     * hooked, if you list all or the runtime environment only supports a listed (disabled) event it will STILL be hooked, if required by the SDK.
     * Page Show events include "pageshow" and "visibilitychange" (with 'visible' state)
     */
    disablePageShowEvents?: string[];
    /**
     * [Optional] A flag for performance optimization to disable attempting to use the Chrome Debug Extension, if disabled and the extension is installed
     * this will not send any notifications.
     */
    disableDbgExt?: boolean;
    /**
     * Add "&w=0" parameter to support UA Parsing when web-workers don't have access to Document.
     * Default is false
     */
    enableWParam?: boolean;
}

export declare interface ICookieMgr {
    /**
     * Enable or Disable the usage of cookies
     */
    setEnabled(value: boolean): void;
    /**
     * Can the system use cookies, if this returns false then all cookie setting and access functions will return nothing
     */
    isEnabled(): boolean;
    /**
     * Set the named cookie with the value and optional domain and optional
     * @param name - The name of the cookie
     * @param value - The value of the cookie (Must already be encoded)
     * @param maxAgeSec - [optional] The maximum number of SECONDS that this cookie should survive
     * @param domain - [optional] The domain to set for the cookie
     * @param path - [optional] Path to set for the cookie, if not supplied will default to "/"
     * @returns - True if the cookie was set otherwise false (Because cookie usage is not enabled or available)
     */
    set(name: string, value: string, maxAgeSec?: number, domain?: string, path?: string): boolean;
    /**
     * Get the value of the named cookie
     * @param name - The name of the cookie
     */
    get(name: string): string;
    /**
     * Delete/Remove the named cookie if cookie support is available and enabled.
     * Note: Not using "delete" as the name because it's a reserved word which would cause issues on older browsers
     * @param name - The name of the cookie
     * @param path - [optional] Path to set for the cookie, if not supplied will default to "/"
     * @returns - True if the cookie was marked for deletion otherwise false (Because cookie usage is not enabled or available)
     */
    del(name: string, path?: string): boolean;
    /**
     * Purge the cookie from the system if cookie support is available, this function ignores the enabled setting of the manager
     * so any cookie will be removed.
     * Note: Not using "delete" as the name because it's a reserved word which would cause issues on older browsers
     * @param name - The name of the cookie
     * @param path - [optional] Path to set for the cookie, if not supplied will default to "/"
     * @returns - True if the cookie was marked for deletion otherwise false (Because cookie usage is not available)
     */
    purge(name: string, path?: string): boolean;
    /**
     * Optional Callback hook to allow the cookie manager to update it's configuration, not generally implemented now that
     * dynamic configuration is supported
     * @param updateState
     */
    update?(updateState: ITelemetryUpdateState): void;
    /**
     * Unload and remove any state that this ICookieMgr may be holding, this is generally called when the
     * owning SDK is being unloaded.
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @return If the unload occurs synchronously then nothing should be returned, if happening asynchronously then
     * the function should return an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * / Promise to allow any listeners to wait for the operation to complete.
     */
    unload?(isAsync?: boolean): void | IPromise<void>;
}

/**
 * Configuration definition for instance based cookie management configuration
 */
export declare interface ICookieMgrConfig {
    /**
     * Defaults to true, A boolean that indicates whether the use of cookies by the SDK is enabled by the current instance.
     * If false, the instance of the SDK initialized by this configuration will not store or read any data from cookies
     */
    enabled?: boolean;
    /**
     * Custom cookie domain. This is helpful if you want to share Application Insights cookies across subdomains.
     */
    domain?: string;
    /**
     * Specifies the path to use for the cookie, defaults to '/'
     */
    path?: string;
    /**
     * Specify the cookie name(s) to be ignored, this will cause any matching cookie name to never be read or written.
     * They may still be explicitly purged or deleted. You do not need to repeat the name in the `blockedCookies`
     * configuration.(Since v2.8.8)
     */
    ignoreCookies?: string[];
    /**
     * Specify the cookie name(s) to never be written, this will cause any cookie name to never be created or updated,
     * they will still be read unless also included in the ignoreCookies and may still be explicitly purged or deleted.
     * If not provided defaults to the same list provided in ignoreCookies. (Since v2.8.8)
     */
    blockedCookies?: string[];
    /**
     * Hook function to fetch the named cookie value.
     * @param name - The name of the cookie
     */
    getCookie?: (name: string) => string;
    /**
     * Hook function to set the named cookie with the specified value.
     * @param name - The name of the cookie
     * @param value - The value to set for the cookie
     */
    setCookie?: (name: string, value: string) => void;
    /**
     * Hook function to delete the named cookie with the specified value, separated from
     * setCookie to avoid the need to parse the value to determine whether the cookie is being
     * added or removed.
     * @param name - The name of the cookie
     * @param cookieValue - The value to set to expire the cookie
     */
    delCookie?: (name: string, cookieValue: string) => void;
}

export declare interface ICustomProperties {
    [key: string]: any;
}

export declare interface IDbgExtension {
    isEnabled: () => boolean;
    enable: () => void;
    disable: () => void;
    listener: INotificationListener;
    sendEvt?: (name: string, data: any) => void;
    debugMsg?: (name: string, data: any) => void;
    diagLog?: (name: string, data: any) => void;
}

export declare interface IDiagnosticLogger {
    /**
     * 0: OFF
     * 1: only critical (default)
     * 2: critical + info
     */
    consoleLoggingLevel: () => number;
    /**
     * The internal logging queue
     */
    queue: _InternalLogMessage[];
    /**
     * This method will throw exceptions in debug mode or attempt to log the error as a console warning.
     * @param severity - The severity of the log message
     * @param message - The log message.
     */
    throwInternal(severity: LoggingSeverity, msgId: _InternalMessageId, msg: string, properties?: Object, isUserAct?: boolean): void;
    /**
     * This will write a debug message to the console if possible
     * @param message - {string} - The debug message
     */
    debugToConsole?(message: string): void;
    /**
     * This will write a warning to the console if possible
     * @param message - The warning message
     */
    warnToConsole(message: string): void;
    /**
     * This will write an error to the console if possible.
     * Provided by the default DiagnosticLogger instance, and internally the SDK will fall back to warnToConsole, however,
     * direct callers MUST check for its existence on the logger as you can provide your own IDiagnosticLogger instance.
     * @param message - The error message
     */
    errorToConsole?(message: string): void;
    /**
     * Resets the internal message count
     */
    resetInternalMessageCount(): void;
    /**
     * Logs a message to the internal queue.
     * @param severity - The severity of the log message
     * @param message - The message to log.
     */
    logInternalMessage?(severity: LoggingSeverity, message: _InternalLogMessage): void;
    /**
     * Optional Callback hook to allow the diagnostic logger to update it's configuration
     * @param updateState
     */
    update?(updateState: ITelemetryUpdateState): void;
    /**
     * Unload and remove any state that this IDiagnosticLogger may be holding, this is generally called when the
     * owning SDK is being unloaded.
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @return If the unload occurs synchronously then nothing should be returned, if happening asynchronously then
     * the function should return an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * / Promise to allow any listeners to wait for the operation to complete.
     */
    unload?(isAsync?: boolean): void | IPromise<void>;
}

export declare interface IDistributedTraceContext {
    /**
     * Returns the current name of the page
     */
    getName(): string;
    /**
     * Sets the current name of the page
     * @param pageName
     */
    setName(pageName: string): void;
    /**
     * Returns the unique identifier for a trace. All requests / spans from the same trace share the same traceId.
     * Must be read from incoming headers or generated according to the W3C TraceContext specification,
     * in a hex representation of 16-byte array. A.k.a. trace-id, TraceID or Distributed TraceID
     */
    getTraceId(): string;
    /**
     * Set the unique identifier for a trace. All requests / spans from the same trace share the same traceId.
     * Must be conform to the W3C TraceContext specification, in a hex representation of 16-byte array.
     * A.k.a. trace-id, TraceID or Distributed TraceID https://www.w3.org/TR/trace-context/#trace-id
     */
    setTraceId(newValue: string): void;
    /**
     * Self-generated 8-bytes identifier of the incoming request. Must be a hex representation of 8-byte array.
     * Also know as the parentId, used to link requests together
     */
    getSpanId(): string;
    /**
     * Self-generated 8-bytes identifier of the incoming request. Must be a hex representation of 8-byte array.
     * Also know as the parentId, used to link requests together
     * https://www.w3.org/TR/trace-context/#parent-id
     */
    setSpanId(newValue: string): void;
    /**
     * An integer representation of the W3C TraceContext trace-flags.
     */
    getTraceFlags(): number | undefined;
    /**
     * https://www.w3.org/TR/trace-context/#trace-flags
     * @param newValue
     */
    setTraceFlags(newValue?: number): void;
}

/**
 * This interface identifies the config which can track changes
 */
export declare interface IDynamicConfigHandler<T = IConfiguration> {
    /**
     * Unique Id for this config handler
     */
    readonly uid: string;
    /**
     * Link back to the configuration object that should be used to get/set values
     */
    cfg: T;
    /**
     * The logger instance to use to logger any issues
     */
    logger: IDiagnosticLogger;
    /**
     * Helper to call any listeners that are waiting to be notified
     */
    notify: () => void;
    /**
     * Watch and track changes for accesses to the current config anb
     */
    watch: (configHandler: WatcherFunction<T>) => IWatcherHandler<T>;
    /**
     * Set the value against the provided config/name with the value, the property
     * will be converted to be dynamic (if not already) as long as the provided config
     * is already a tracked dynamic object.
     * @throws TypeError if the provided config is not a monitored dynamic config
     */
    set: <C, V>(theConfig: C, name: string, value: V) => V;
    /**
     * Set default values for the config if not present.
     * @param theConfig - The configuration object to set default on (if missing)
     * @param defaultValues - The default values to apply to the config
     */
    setDf: <C>(theConfig: C, defaultValues: IConfigDefaults<C, T>) => C;
    /**
     * Set this named property of the target as referenced, which will cause any object or array instances
     * to be updated in-place rather than being entirely replaced. All other values will continue to be replaced.
     * @param target - The object which has (or will have) the named property
     * @param name - The name of the property in the target
     * @returns The referenced properties current value.
     */
    ref: <C, V = any>(target: C, name: string) => V;
    /**
     * Set this named property of the target as read-only, which will block this single named property from
     * ever being changed for the target instance.
     * This does NOT freeze or seal the instance, it just stops the direct re-assignment of the named property,
     * if the value is a non-primitive (ie. an object or array) it's properties will still be mutable.
     * @param target - The object which has (or will have) the named property
     * @param name - The name of the property in the target
     * @returns The referenced properties current value.
     */
    rdOnly: <C, V = any>(target: C, name: string) => V;
    /**
     * Set the `value` that is or will be assigned to this named property of the target will not have it's
     * properties converted into dynamic properties, this means that any changes the values properties will
     * not be monitored for changes and therefore will not cause any listeners to be notified in any value
     * is changed. If the value associated with the `target[name]` is change this is still dynamic and will
     * cause listeners to be notified.
     * @param target - The object which has (or will have) the named property
     * @param name - The name of the property in the target
     * @returns The referenced properties current value.
     * @example
     * ```ts
     * let localValue = target[name];   // If within a listener this will cause the listener to be called again
     * target[name] = newValue;         // This will notify listeners that accessed target[name]
     *
     * // This will not cause lsiteners to be called because propa is not converted and value of target[name]
     * // did not change.
     * target[name].propa = 1;
     * target[name].propb = 2;
     *
     * // If within a listener this will caused the listener to be called again only if target[name] is reassigned
     * // not if the value associated with propa is changed.
     * let localValue = target[name].propa;
     * ```
     */
    blkVal: <C, V = any>(target: C, name: string) => V;
}

export declare interface IDynamicPropertyHandler<T = IConfiguration> {
    /**
     * Identifies the name of the field that is handled by this handler
     */
    n: string;
    /**
     * The current collection is watcher handlers which should be called if the value changes
     */
    h: IWatcherHandler<T>[];
}

export declare interface IInstrumentCallDetails {
    name: string;
    inst: any;
    /**
     * This returns an object that the hook function can use to store hook specific
     * context, it it not shared with any other hook instances and is unique for the
     * current call.
     * A hook implementation can use this to pass / share context between different
     * hook callbacks eg. request/response requst/hookErrors etc.
     */
    ctx: () => any;
    /**
     * Allows the hook functions to replace the original arguments
     * @param idx - The argument index (0 based)
     * @param value - The new value for the argument
     */
    set: (idx: number, value: any) => void;
    /**
     * The result of the original method, only populated after the original method has returned
     */
    rslt?: any;
    /**
     * The error (exception) which occurred while executing the original method
     */
    err?: Error;
    /**
     * The Event object from (window.event) at the start of the original call
     */
    evt?: Event;
}

/**
 * The holder of the specific instance callback
 */
export declare interface IInstrumentHook extends IUnloadHook {
    /** Unique Id for this callback on the hooked method */
    id: number;
    /** Holds the callbacks */
    cbks: IInstrumentHooksCallbacks;
    /** Remove this hook from the function */
    rm: () => void;
}

export declare interface IInstrumentHooks {
    i: number;
    n: string;
    f: any;
    h: IInstrumentHook[];
}

/**
 * The callbacks to call for the instrumented function, you must provide at least the request and/or response callbacks, both are not required.
 * You must always supply the error callback
 */
export declare interface IInstrumentHooksCallbacks {
    /**
     * [Optional] Namespace details (same as the namespace used for events), useful for debugging and testing to
     * identify the source of the instrumented hooks
     */
    ns?: string | string[];
    /**
     * The hook callback to call before the original function is called
     */
    req?: InstrumentorHooksCallback;
    /**
     * The hook callback to call after the original function was called
     */
    rsp?: InstrumentorHooksCallback;
    /**
     * The callback to call if the hook function causes an exception
     */
    hkErr?: InstrumentorHooksCallback;
    /**
     * The callback to call if the original function causes an exception, even if you
     * supply a callback the original exception will still be thrown
     */
    fnErr?: InstrumentorHooksCallback;
}

/**
 * An alternate interface which provides automatic removal during unloading of the component
 */
export declare interface ILegacyUnloadHook {
    /**
     * Legacy Self remove the referenced component
     */
    remove: () => void;
}

export declare interface ILoadedPlugin<T extends IPlugin> {
    plugin: T;
    /**
     * Identifies whether the plugin is enabled and can process events. This is slightly different from isInitialized as the plugin may be initialized but disabled
     * via the setEnabled() or it may be a shared plugin which has had it's teardown function called from another instance..
     * @returns boolean = true if the plugin is in a state where it is operational.
     */
    isEnabled: () => boolean;
    /**
     * You can optionally enable / disable a plugin from processing events.
     * Setting enabled to true will not necessarily cause the `isEnabled()` to also return true
     * as the plugin must also have been successfully initialized and not had it's `teardown` method called
     * (unless it's also been re-initialized)
     */
    setEnabled: (isEnabled: boolean) => void;
    remove: (isAsync?: boolean, removeCb?: (removed?: boolean) => void) => void;
}

/**
 * Initialize the queue of plugins
 * @param plugins - The array of plugins to initialize and setting of the next plugin
 * @param config - The current config for the instance
 * @param core - THe current core instance
 * @param extensions - The extensions
 */
export declare function initializePlugins(processContext: IProcessTelemetryContext, extensions: IPlugin[]): void;

/**
 * An interface used for the notification listener.
 * @interface
 */
export declare interface INotificationListener {
    /**
     * [Optional] A function called when events are sent.
     * @param events - The array of events that have been sent.
     */
    eventsSent?: (events: ITelemetryItem[]) => void;
    /**
     * [Optional] A function called when events are discarded.
     * @param events - The array of events that have been discarded.
     * @param reason - The reason for discarding the events. The EventsDiscardedReason
     * constant should be used to check the different values.
     */
    eventsDiscarded?: (events: ITelemetryItem[], reason: number) => void;
    /**
     * [Optional] A function called when the events have been requested to be sent to the sever.
     * @param sendReason - The reason why the event batch is being sent.
     * @param isAsync - A flag which identifies whether the requests are being sent in an async or sync manner.
     */
    eventsSendRequest?: (sendReason: number, isAsync?: boolean) => void;
    /**
     * [Optional] This event is sent if you have enabled perf events, they are primarily used to track internal performance testing and debugging
     * the event can be displayed via the debug plugin extension.
     * @param perfEvent
     */
    perfEvent?: (perfEvent: IPerfEvent) => void;
    /**
     * Unload and remove any state that this INotificationListener may be holding, this is generally called when the
     * owning Manager is being unloaded.
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @return If the unload occurs synchronously then nothing should be returned, if happening asynchronously then
     * the function should return an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * / Promise to allow any listeners to wait for the operation to complete.
     */
    unload?(isAsync?: boolean): void | IPromise<void>;
}

/**
 * Class to manage sending notifications to all the listeners.
 */
export declare interface INotificationManager {
    listeners: INotificationListener[];
    /**
     * Adds a notification listener.
     * @param listener - The notification listener to be added.
     */
    addNotificationListener(listener: INotificationListener): void;
    /**
     * Removes all instances of the listener.
     * @param listener - AWTNotificationListener to remove.
     */
    removeNotificationListener(listener: INotificationListener): void;
    /**
     * Notification for events sent.
     * @param events - The array of events that have been sent.
     */
    eventsSent(events: ITelemetryItem[]): void;
    /**
     * Notification for events being discarded.
     * @param events - The array of events that have been discarded by the SDK.
     * @param reason - The reason for which the SDK discarded the events. The EventsDiscardedReason
     * constant should be used to check the different values.
     */
    eventsDiscarded(events: ITelemetryItem[], reason: number): void;
    /**
     * [Optional] A function called when the events have been requested to be sent to the sever.
     * @param sendReason - The reason why the event batch is being sent.
     * @param isAsync - A flag which identifies whether the requests are being sent in an async or sync manner.
     */
    eventsSendRequest?(sendReason: number, isAsync: boolean): void;
    /**
     * [Optional] This event is sent if you have enabled perf events, they are primarily used to track internal performance testing and debugging
     * the event can be displayed via the debug plugin extension.
     * @param perfEvent - The perf event details
     */
    perfEvent?(perfEvent: IPerfEvent): void;
    /**
     * Unload and remove any state that this INotificationManager may be holding, this is generally called when the
     * owning SDK is being unloaded.
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @return If the unload occurs synchronously then nothing should be returned, if happening asynchronously then
     * the function should return an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * / Promise to allow any listeners to wait for the operation to complete.
     */
    unload?(isAsync?: boolean): void | IPromise<void>;
}

/**
 * Add an instrumentation hook to the provided named "event" for the target class / object, this doesn't check whether the
 * named "event" is in fact a function and just assigns the instrumentation hook to the target[evtName]
 * @param target - The target object
 * @param evtName - The name of the event
 * @param callbacks - The callbacks to configure and call whenever the function is called
 * @param checkPrototype - If the function doesn't exist on the target should it attempt to hook the prototype function
 * @param checkParentProto - If the function doesn't exist on the target or it's prototype should it attempt to hook the parent's prototype
 */
export declare function InstrumentEvent(target: any, evtName: string, callbacks: IInstrumentHooksCallbacks, checkPrototype?: boolean, checkParentProto?: boolean): IInstrumentHook;

/**
 * Intercept the named prototype functions for the target class / object
 * @param target - The target object
 * @param funcName - The function name
 * @param callbacks - The callbacks to configure and call whenever the function is called
 * @param checkPrototype - If the function doesn't exist on the target should it attempt to hook the prototype function
 * @param checkParentProto - If the function doesn't exist on the target or it's prototype should it attempt to hook the parent's prototype
 */
export declare function InstrumentFunc(target: any, funcName: string, callbacks: IInstrumentHooksCallbacks, checkPrototype?: boolean, checkParentProto?: boolean): IInstrumentHook;

/**
 * Intercept the named functions for the target class / object
 * @param target - The target object
 * @param funcNames - The function names to intercept and call
 * @param callbacks - The callbacks to configure and call whenever the function is called
 * @param checkPrototype - If the function doesn't exist on the target should it attempt to hook the prototype function
 * @param checkParentProto - If the function doesn't exist on the target or it's prototype should it attempt to hook the parent's prototype
 */
export declare function InstrumentFuncs(target: any, funcNames: string[], callbacks: IInstrumentHooksCallbacks, checkPrototype?: boolean, checkParentProto?: boolean): IInstrumentHook[];

/**
 * A callback function that will be called for the wrapped instrumentation function
 * before the original function is executed.
 */
export declare type InstrumentorHooksCallback = (funcArgs: IInstrumentCallDetails, ...orgArgs: any[]) => void;

/**
 * Intercept the named prototype functions for the target class / object
 * @param target - The target object
 * @param funcName - The function name
 * @param callbacks - The callbacks to configure and call whenever the function is called
 */
export declare function InstrumentProto(target: any, funcName: string, callbacks: IInstrumentHooksCallbacks): IInstrumentHook;

/**
 * Intercept the named prototype functions for the target class / object
 * @param target - The target object
 * @param funcNames - The function names to intercept and call
 * @param callbacks - The callbacks to configure and call whenever the function is called
 */
export declare function InstrumentProtos(target: any, funcNames: string[], callbacks: IInstrumentHooksCallbacks): IInstrumentHook[];

export declare class _InternalLogMessage {
    static dataType: string;
    message: string;
    messageId: _InternalMessageId;
    constructor(msgId: _InternalMessageId, msg: string, isUserAct?: boolean, properties?: Object);
}

export declare type _InternalMessageId = number | _eInternalMessageId;

/**
 * This interface identifies the details of an internal performance event - it does not represent an outgoing reported event
 */
export declare interface IPerfEvent {
    /**
     * The name of the performance event
     */
    name: string;
    /**
     * The start time of the performance event
     */
    start: number;
    /**
     * The payload (contents) of the perfEvent, may be null or only set after the event has completed depending on
     * the runtime environment.
     */
    payload: any;
    /**
     * Is this occurring from an asynchronous event
     */
    isAsync: boolean;
    /**
     * Identifies the total inclusive time spent for this event, including the time spent for child events,
     * this will be undefined until the event is completed
     */
    time?: number;
    /**
     * Identifies the exclusive time spent in for this event (not including child events),
     * this will be undefined until the event is completed.
     */
    exTime?: number;
    /**
     * The Parent event that was started before this event was created
     */
    parent?: IPerfEvent;
    /**
     * The child perf events that are contained within the total time of this event.
     */
    childEvts?: IPerfEvent[];
    /**
     * Identifies whether this event is a child event of a parent
     */
    isChildEvt: () => boolean;
    /**
     * Get the names additional context associated with this perf event
     */
    getCtx?: (key: string) => any;
    /**
     * Set the named additional context to be associated with this perf event, this will replace any existing value
     */
    setCtx?: (key: string, value: any) => void;
    /**
     * Mark this event as completed, calculating the total execution time.
     */
    complete: () => void;
}

/**
 * This defines an internal performance manager for tracking and reporting the internal performance of the SDK -- It does
 * not represent or report any event to the server.
 */
export declare interface IPerfManager {
    /**
     * Create a new event and start timing, the manager may return null/undefined to indicate that it does not
     * want to monitor this source event.
     * @param src - The source name of the event
     * @param payloadDetails - An optional callback function to fetch the payload details for the event.
     * @param isAsync - Is the event occurring from a async event
     */
    create(src: string, payloadDetails?: () => any, isAsync?: boolean): IPerfEvent | null | undefined;
    /**
     * Complete the perfEvent and fire any notifications.
     * @param perfEvent - Fire the event which will also complete the passed event
     */
    fire(perfEvent: IPerfEvent): void;
    /**
     * Set an execution context value
     * @param key - The context key name
     * @param value - The value
     */
    setCtx(key: string, value: any): void;
    /**
     * Get the execution context value
     * @param key - The context key
     */
    getCtx(key: string): any;
}

/**
 * Identifies an interface to a host that can provide an IPerfManager implementation
 */
export declare interface IPerfManagerProvider {
    /**
     * Get the current performance manager
     */
    getPerfMgr(): IPerfManager;
    /**
     * Set the current performance manager
     * @param perfMgr - The performance manager
     */
    setPerfMgr(perfMgr: IPerfManager): void;
}

export declare interface IPlugin {
    /**
     * Initialize plugin loaded by SDK
     * @param config - The config for the plugin to use
     * @param core - The current App Insights core to use for initializing this plugin instance
     * @param extensions - The complete set of extensions to be used for initializing the plugin
     * @param pluginChain - [Optional] specifies the current plugin chain which identifies the
     * set of plugins and the order they should be executed for the current request.
     */
    initialize: (config: IConfiguration, core: IAppInsightsCore, extensions: IPlugin[], pluginChain?: ITelemetryPluginChain) => void;
    /**
     * Returns a value that indicates whether the plugin has already been previously initialized.
     * New plugins should implement this method to avoid being initialized more than once.
     */
    isInitialized?: () => boolean;
    /**
     * Tear down the plugin and remove any hooked value, the plugin should be removed so that it is no longer initialized and
     * therefore could be re-initialized after being torn down. The plugin should ensure that once this has been called any further
     * processTelemetry calls are ignored and it just calls the processNext() with the provided context.
     * @param unloadCtx - This is the context that should be used during unloading.
     * @param unloadState - The details / state of the unload process, it holds details like whether it should be unloaded synchronously or asynchronously and the reason for the unload.
     * @returns boolean - true if the plugin has or will call processNext(), this for backward compatibility as previously teardown was synchronous and returned nothing.
     */
    teardown?: (unloadCtx: IProcessTelemetryUnloadContext, unloadState?: ITelemetryUnloadState) => void | boolean;
    /**
     * Extension name
     */
    readonly identifier: string;
    /**
     * Plugin version (available in data.properties.version in common schema)
     */
    readonly version?: string;
    /**
     * The App Insights core to use for backward compatibility.
     * Therefore the interface will be able to access the core without needing to cast to "any".
     * [optional] any 3rd party plugins which are already implementing this interface don't fail to compile.
     */
    core?: IAppInsightsCore;
}

/**
 * The current context for the current call to processTelemetry(), used to support sharing the same plugin instance
 * between multiple AppInsights instances
 */
export declare interface IProcessTelemetryContext extends IBaseProcessingContext {
    /**
     * Call back for telemetry processing before it it is sent
     * @param env - This is the current event being reported
     * @returns boolean (true) if there is no more plugins to process otherwise false or undefined (void)
     */
    processNext: (env: ITelemetryItem) => boolean | void;
    /**
     * Create a new context using the core and config from the current instance, returns a new instance of the same type
     * @param plugins - The execution order to process the plugins, if null or not supplied
     *                  then the current execution order will be copied.
     * @param startAt - The plugin to start processing from, if missing from the execution
     *                  order then the next plugin will be NOT set.
     */
    createNew: (plugins?: IPlugin[] | ITelemetryPluginChain, startAt?: IPlugin) => IProcessTelemetryContext;
}

/**
 * The current context for the current call to teardown() implementations, used to support when plugins are being removed
 * or the SDK is being unloaded.
 */
export declare interface IProcessTelemetryUnloadContext extends IBaseProcessingContext {
    /**
     * This Plugin has finished unloading, so unload the next one
     * @param uploadState - The state of the unload process
     * @returns boolean (true) if there is no more plugins to process otherwise false or undefined (void)
     */
    processNext: (unloadState: ITelemetryUnloadState) => boolean | void;
    /**
     * Create a new context using the core and config from the current instance, returns a new instance of the same type
     * @param plugins - The execution order to process the plugins, if null or not supplied
     *                  then the current execution order will be copied.
     * @param startAt - The plugin to start processing from, if missing from the execution
     *                  order then the next plugin will be NOT set.
     */
    createNew: (plugins?: IPlugin[] | ITelemetryPluginChain, startAt?: IPlugin) => IProcessTelemetryUnloadContext;
}

/**
 * The current context for the current call to the plugin update() implementations, used to support the notifications
 * for when plugins are added, removed or the configuration was changed.
 */
export declare interface IProcessTelemetryUpdateContext extends IBaseProcessingContext {
    /**
     * This Plugin has finished unloading, so unload the next one
     * @param updateState - The update State
     * @returns boolean (true) if there is no more plugins to process otherwise false or undefined (void)
     */
    processNext: (updateState: ITelemetryUpdateState) => boolean | void;
    /**
     * Create a new context using the core and config from the current instance, returns a new instance of the same type
     * @param plugins - The execution order to process the plugins, if null or not supplied
     *                  then the current execution order will be copied.
     * @param startAt - The plugin to start processing from, if missing from the execution
     *                  order then the next plugin will be NOT set.
     */
    createNew: (plugins?: IPlugin[] | ITelemetryPluginChain, startAt?: IPlugin) => IProcessTelemetryUpdateContext;
}

export declare interface _IRegisteredEvents {
    name: string;
    handler: any;
}

export { isArray }

/**
 * Checks if HTML5 Beacons are supported in the current environment.
 * @returns True if supported, false otherwise.
 */
export declare function isBeaconsSupported(): boolean;

export { isBoolean }

export { isDate }

export { isError }

/**
 * Checks if the Fetch API is supported in the current environment.
 * @param withKeepAlive - [Optional] If True, check if fetch is available and it supports the keepalive feature, otherwise only check if fetch is supported
 * @returns True if supported, otherwise false
 */
export declare function isFetchSupported(withKeepAlive?: boolean): boolean;

export { isFunction }

/**
 * Identifies whether the current environment appears to be IE
 */
export declare function isIE(): boolean;

export declare function isNotNullOrUndefined<T>(value: T): value is T;

export { isNotTruthy }

export declare function isNotUndefined<T>(value: T): value is T;

export { isNullOrUndefined }

export { isNumber }

export { isObject }

/**
 * Returns whether the environment is reporting that we are running in a React Native Environment
 */
export declare function isReactNative(): boolean;

export declare function isSafari(userAgentStr?: string): boolean;

/**
 * Is the parsed traceParent indicating that the trace is currently sampled.
 * @param value - The parsed traceParent value
 * @returns
 */
export declare function isSampledFlag(value: ITraceParent): boolean;

export { isString }

export { isSymbol }

export { isTruthy }

export { isTypeof }

export { isUndefined }

/**
 * Is the provided W3c span id (aka. parent id) a valid string representation, it must be a 16-character
 * string of lowercase hexadecimal characters, for example, 00f067aa0ba902b7.
 * If all characters are zero (0000000000000000) this is considered an invalid value.
 * @param value - The W3c span id to be validated
 * @returns true if valid otherwise false
 */
export declare function isValidSpanId(value: string): boolean;

/**
 * Is the provided W3c Trace Id a valid string representation, it must be a 32-character string
 * of lowercase hexadecimal characters for example, 4bf92f3577b34da6a3ce929d0e0e4736.
 * If all characters as zero (00000000000000000000000000000000) it will be considered an invalid value.
 * @param value - The W3c trace Id to be validated
 * @returns true if valid otherwise false
 */
export declare function isValidTraceId(value: string): boolean;

/**
 * Validates that the provided ITraceParent instance conforms to the currently supported specifications
 * @param value
 * @returns
 */
export declare function isValidTraceParent(value: ITraceParent): boolean;

/**
 * Checks if XMLHttpRequest is supported
 * @returns True if supported, otherwise false
 */
export declare function isXhrSupported(): boolean;

export declare interface ITelemetryInitializerContainer {
    /**
     * Add a telemetry processor to decorate or drop telemetry events.
     * @param telemetryInitializer - The Telemetry Initializer function
     * @returns - A ITelemetryInitializerHandler to enable the initializer to be removed
     */
    addTelemetryInitializer(telemetryInitializer: TelemetryInitializerFunction): ITelemetryInitializerHandler | void;
}

export declare interface ITelemetryInitializerHandler extends ILegacyUnloadHook {
    remove(): void;
}

/**
 * Telemety item supported in Core
 */
export declare interface ITelemetryItem {
    /**
     * CommonSchema Version of this SDK
     */
    ver?: string;
    /**
     * Unique name of the telemetry item
     */
    name: string;
    /**
     * Timestamp when item was sent
     */
    time?: string;
    /**
     * Identifier of the resource that uniquely identifies which resource data is sent to
     */
    iKey?: string;
    /**
     * System context properties of the telemetry item, example: ip address, city etc
     */
    ext?: {
        [key: string]: any;
    };
    /**
     * System context property extensions that are not global (not in ctx)
     */
    tags?: Tags & Tags[];
    /**
     * Custom data
     */
    data?: ICustomProperties;
    /**
     * Telemetry type used for part B
     */
    baseType?: string;
    /**
     * Based on schema for part B
     */
    baseData?: {
        [key: string]: any;
    };
}

/**
 * Configuration provided to SDK core
 */
export declare interface ITelemetryPlugin extends ITelemetryProcessor, IPlugin {
    /**
     * Set next extension for telemetry processing, this is not optional as plugins should use the
     * processNext() function of the passed IProcessTelemetryContext instead. It is being kept for
     * now for backward compatibility only.
     */
    setNextPlugin?: (next: ITelemetryPlugin | ITelemetryPluginChain) => void;
    /**
     * Priority of the extension
     */
    readonly priority: number;
}

/**
 * Configuration provided to SDK core
 */
export declare interface ITelemetryPluginChain extends ITelemetryProcessor {
    /**
     * Returns the underlying plugin that is being proxied for the processTelemetry call
     */
    getPlugin: () => ITelemetryPlugin;
    /**
     * Returns the next plugin
     */
    getNext: () => ITelemetryPluginChain;
    /**
     * This plugin is being unloaded and should remove any hooked events and cleanup any global/scoped values, after this
     * call the plugin will be removed from the telemetry processing chain and will no longer receive any events..
     * @param unloadCtx - The unload context to use for this call.
     * @param unloadState - The details of the unload operation
     */
    unload?: (unloadCtx: IProcessTelemetryUnloadContext, unloadState: ITelemetryUnloadState) => void;
}

declare interface ITelemetryProcessor {
    /**
     * Call back for telemetry processing before it it is sent
     * @param env - This is the current event being reported
     * @param itemCtx - This is the context for the current request, ITelemetryPlugin instances
     * can optionally use this to access the current core instance or define / pass additional information
     * to later plugins (vs appending items to the telemetry item)
     */
    processTelemetry: (env: ITelemetryItem, itemCtx?: IProcessTelemetryContext) => void;
    /**
     * The the plugin should re-evaluate configuration and update any cached configuration settings or
     * plugins. If implemented this method will be called whenever a plugin is added or removed and if
     * the configuration has bee updated.
     * @param updateCtx - This is the context that should be used during updating.
     * @param updateState - The details / state of the update process, it holds details like the current and previous configuration.
     * @returns boolean - true if the plugin has or will call updateCtx.processNext(), this allows the plugin to perform any asynchronous operations.
     */
    update?: (updateCtx: IProcessTelemetryUpdateContext, updateState: ITelemetryUpdateState) => void | boolean;
}

export declare interface ITelemetryUnloadState {
    reason: TelemetryUnloadReason;
    isAsync: boolean;
    flushComplete?: boolean;
}

export declare interface ITelemetryUpdateState {
    /**
     * Identifies the reason for the update notification, this is a bitwise numeric value
     */
    reason: TelemetryUpdateReason;
    /**
     * This is a new active configuration that should be used
     */
    cfg?: IConfiguration;
    /**
     * The detected changes
     */
    oldCfg?: IConfiguration;
    /**
     * If this is a configuration update this was the previous configuration that was used
     */
    newConfig?: IConfiguration;
    /**
     * Was the new config requested to be merged with the existing config
     */
    merge?: boolean;
    /**
     * This holds a collection of plugins that have been added (if the reason identifies that one or more plugins have been added)
     */
    added?: IPlugin[];
    /**
     * This holds a collection of plugins that have been removed (if the reason identifies that one or more plugins have been removed)
     */
    removed?: IPlugin[];
}

/**
 * This interface represents the components of a W3C traceparent header
 */
export declare interface ITraceParent {
    /**
     * The version of the definition, this MUST be a string with a length of 2 and only contain lowercase
     * hexadecimal characters. A value of 'ff' is considered to be an invalid version.
     */
    version: string;
    /**
     * This is the ID of the whole trace forest and is used to uniquely identify a distributed trace
     * through a system. It is represented as a 32-character string of lowercase hexadecimal characters,
     * for example, 4bf92f3577b34da6a3ce929d0e0e4736.
     * All characters as zero (00000000000000000000000000000000) is considered an invalid value.
     */
    traceId: string;
    /**
     * This is the ID of the current request as known by the caller (in some tracing systems, this is also
     * known as the parent-id, where a span is the execution of a client request). It is represented as an
     * 16-character string of lowercase hexadecimal characters, for example, 00f067aa0ba902b7.
     * All bytes as zero (0000000000000000) is considered an invalid value.
     */
    spanId: string;
    /**
     * An 8-bit value of flags that controls tracing such as sampling, trace level, etc. These flags are
     * recommendations given by the caller rather than strict rules to follow.
     * As this is a bit field, you cannot interpret flags by decoding the hex value and looking at the resulting
     * number. For example, a flag 00000001 could be encoded as 01 in hex, or 09 in hex if present with the flag
     * 00001000. A common mistake in bit fields is forgetting to mask when interpreting flags.
     */
    traceFlags: number;
}

export declare interface IUnloadableComponent {
    /**
     * Teardown / Unload hook to allow implementations to perform some additional unload operations before the BaseTelemetryPlugin
     * finishes it's removal.
     * @param unloadCtx - This is the context that should be used during unloading.
     * @param unloadState - The details / state of the unload process, it holds details like whether it should be unloaded synchronously or asynchronously and the reason for the unload.
     * @param asyncCallback - An optional callback that the plugin must call if it returns true to inform the caller that it has completed any async unload/teardown operations.
     * @returns boolean - true if the plugin has or will call asyncCallback, this allows the plugin to perform any asynchronous operations.
     */
    _doUnload?: (unloadCtx?: IProcessTelemetryUnloadContext, unloadState?: ITelemetryUnloadState, asyncCallback?: () => void) => void | boolean;
}

export declare interface IUnloadHandlerContainer {
    add: (handler: UnloadHandler) => void;
    run: (itemCtx: IProcessTelemetryUnloadContext, unloadState: ITelemetryUnloadState) => void;
}

/**
 * An interface which provides automatic removal during unloading of the component
 */
export declare interface IUnloadHook {
    /**
     * Self remove the referenced component
     */
    rm: () => void;
}

/**
 * Interface which identifiesAdd this hook so that it is automatically removed during unloading
 * @param hooks - The single hook or an array of IInstrumentHook objects
 */
export declare interface IUnloadHookContainer {
    add: (hooks: IUnloadHook | IUnloadHook[] | Iterator<IUnloadHook> | ILegacyUnloadHook | ILegacyUnloadHook[] | Iterator<ILegacyUnloadHook>) => void;
    run: (logger?: IDiagnosticLogger) => void;
}

export declare interface IWatchDetails<T = IConfiguration> {
    /**
     * The current config object
     */
    cfg: T;
    /**
     * Set the value against the provided config/name with the value, the property
     * will be converted to be dynamic (if not already) as long as the provided config
     * is already a tracked dynamic object.
     * @throws TypeError if the provided config is not a monitored dynamic config
     */
    set: <C, V>(theConfig: C, name: string, value: V) => V;
    /**
     * Set default values for the config if not present.
     * @param theConfig - The configuration object to set default on (if missing)
     * @param defaultValues - The default values to apply to the config
     */
    setDf: <C>(theConfig: C, defaultValues: IConfigDefaults<C>) => C;
    /**
     * Set this named property of the target as referenced, which will cause any object or array instance
     * to be updated in-place rather than being entirely replaced. All other values will continue to be replaced.
     * @returns The referenced properties current value
     */
    ref: <C, V = any>(target: C, name: string) => V;
    /**
     * Set this named property of the target as read-only, which will block this single named property from
     * ever being changed for the target instance.
     * This does NOT freeze or seal the instance, it just stops the direct re-assignment of the named property,
     * if the value is a non-primitive (ie. an object or array) it's properties will still be mutable.
     * @returns The referenced properties current value
     */
    rdOnly: <C, V = any>(target: C, name: string) => V;
}

export declare interface IWatcherHandler<T = IConfiguration> extends IUnloadHook {
    fn: WatcherFunction<T>;
    rm: () => void;
}

export declare const LoggingSeverity: EnumValue<typeof eLoggingSeverity>;

export declare type LoggingSeverity = number | eLoggingSeverity;

/**
 * Logs a message to the internal queue.
 * @param logger - The Diagnostic Logger instance to use.
 * @param severity - {LoggingSeverity} - The severity of the log message
 * @param message - {_InternalLogMessage} - The message to log.
 */
export declare function _logInternalMessage(logger: IDiagnosticLogger, severity: LoggingSeverity, message: _InternalLogMessage): void;

export declare function mergeEvtNamespace(theNamespace: string, namespaces?: string | string[] | null): string | string[];

export declare const MinChannelPriorty: number;

/**
 * Generate a random 32-bit number between (0x000000..0xFFFFFFFF) or (-0x80000000..0x7FFFFFFF), using MWC (Multiply with carry)
 * instead of Math.random() defaults to un-signed.
 * Used as a replacement random generator for IE to avoid issues with older IE instances.
 * @param signed - True to return a signed 32-bit number (-0x80000000..0x7FFFFFFF) otherwise an unsigned one (0x000000..0xFFFFFFFF)
 */
export declare function mwcRandom32(signed?: boolean): number;

/**
 * Seed the MWC random number generator with the specified seed or a random value
 * @param value - optional the number to used as the seed, if undefined, null or zero a random value will be chosen
 */
export declare function mwcRandomSeed(value?: number): void;

export declare function newGuid(): string;

/**
 * Generate random base64 id string.
 * The default length is 22 which is 132-bits so almost the same as a GUID but as base64 (the previous default was 5)
 * @param maxLength - Optional value to specify the length of the id to be generated, defaults to 22
 */
export declare function newId(maxLength?: number): string;

/**
 * Validates that the string name conforms to the JS IdentifierName specification and if not
 * normalizes the name so that it would. This method does not identify or change any keywords
 * meaning that if you pass in a known keyword the same value will be returned.
 * This is a simplified version
 * @param name - The name to validate
 */
export declare function normalizeJsName(name: string): string;

/**
 * Class to manage sending notifications to all the listeners.
 */
export declare class NotificationManager implements INotificationManager {
    readonly listeners: INotificationListener[];
    constructor(config?: IConfiguration);
    /**
     * Adds a notification listener.
     * @param listener - The notification listener to be added.
     */
    addNotificationListener(listener: INotificationListener): void;
    /**
     * Removes all instances of the listener.
     * @param listener - AWTNotificationListener to remove.
     */
    removeNotificationListener(listener: INotificationListener): void;
    /**
     * Notification for events sent.
     * @param events - The array of events that have been sent.
     */
    eventsSent(events: ITelemetryItem[]): void;
    /**
     * Notification for events being discarded.
     * @param events - The array of events that have been discarded by the SDK.
     * @param reason - The reason for which the SDK discarded the events. The EventsDiscardedReason
     * constant should be used to check the different values.
     */
    eventsDiscarded(events: ITelemetryItem[], reason: number): void;
    /**
     * [Optional] A function called when the events have been requested to be sent to the sever.
     * @param sendReason - The reason why the event batch is being sent.
     * @param isAsync - A flag which identifies whether the requests are being sent in an async or sync manner.
     */
    eventsSendRequest?(sendReason: number, isAsync: boolean): void;
    /**
     * [Optional] This event is sent if you have enabled perf events, they are primarily used to track internal performance testing and debugging
     * the event can be displayed via the debug plugin extension.
     * @param perfEvent
     */
    perfEvent?(perfEvent: IPerfEvent): void;
    /**
     * Unload and remove any state that this INotificationManager may be holding, this is generally called when the
     * owning SDK is being unloaded.
     * @param isAsync - Can the unload be performed asynchronously (default)
     * @return If the unload occurs synchronously then nothing should be returned, if happening asynchronously then
     * the function should return an [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * / Promise to allow any listeners to wait for the operation to complete.
     */
    unload?(isAsync?: boolean): void | IPromise<void>;
}

export { objDefineAccessors }

/**
 * Pass in the objects to merge as arguments, this will only "merge" (extend) properties that are owned by the object.
 * It will NOT merge inherited or non-enumerable properties.
 * @param obj1 - object to merge.  Set this argument to 'true' for a deep extend.
 * @param obj2 - object to merge.
 * @param obj3 - object to merge.
 * @param obj4 - object to merge.
 * @param obj5 - object to merge.
 * @returns The extended first object.
 */
export declare function objExtend<T2, T3, T4, T5, T6>(deepExtend?: boolean, obj2?: T2, obj3?: T3, obj4?: T4, obj5?: T5, obj6?: T6): T2 & T3 & T4 & T5 & T6;

export declare function objExtend<T1, T2, T3, T4, T5, T6>(obj1?: T1, obj2?: T2, obj3?: T3, obj4?: T4, obj5?: T5, obj6?: T6): T1 & T2 & T3 & T4 & T5 & T6;

export { objForEachKey }

export { objFreeze }

export { objKeys }

export { objSeal }

export { objToString }

/**
 * Watch and track changes for accesses to the current config, the provided config MUST already be
 * a dynamic config or a child accessed via the dynamic config
 * @param config
 * @param configHandler
 * @param logger - The logger instance to use if there is no existing handler
 * @returns A watcher handler instance that can be used to remove itself when being unloaded
 * @throws TypeError if the provided config is not a dynamic config instance
 */
export declare function onConfigChange<T = IConfiguration>(config: T, configHandler: WatcherFunction<T>, logger?: IDiagnosticLogger): IWatcherHandler<T>;

/**
 * A helper function to assist with JIT performance for objects that have properties added / removed dynamically
 * this is primarily for chromium based browsers and has limited effects on Firefox and none of IE. Only call this
 * function after you have finished "updating" the object, calling this within loops reduces or defeats the benefits.
 * This helps when iterating using for..in, objKeys() and objForEach()
 * @param theObject - The object to be optimized if possible
 */
export declare function optimizeObject<T>(theObject: T): T;

/**
 * Attempt to parse the provided string as a W3C TraceParent header value (https://www.w3.org/TR/trace-context/#traceparent-header)
 *
 * @param value
 * @returns
 */
export declare function parseTraceParent(value: string): ITraceParent;

export declare class PerfEvent implements IPerfEvent {
    static ParentContextKey: string;
    static ChildrenContextKey: string;
    /**
     * The name of the event
     */
    name: string;
    /**
     * The start time of the event in ms
     */
    start: number;
    /**
     * The payload (contents) of the perfEvent, may be null or only set after the event has completed depending on
     * the runtime environment.
     */
    payload: any;
    /**
     * Is this occurring from an asynchronous event
     */
    isAsync: boolean;
    /**
     * Identifies the total inclusive time spent for this event, including the time spent for child events,
     * this will be undefined until the event is completed
     */
    time?: number;
    /**
     * Identifies the exclusive time spent in for this event (not including child events),
     * this will be undefined until the event is completed.
     */
    exTime?: number;
    /**
     * Identifies whether this event is a child event of a parent
     */
    isChildEvt: () => boolean;
    getCtx?: (key: string) => any | null | undefined;
    setCtx?: (key: string, value: any) => void;
    complete: () => void;
    constructor(name: string, payloadDetails: () => any, isAsync: boolean);
}

export declare class PerfManager implements IPerfManager {
    /**
     * General bucket used for execution context set and retrieved via setCtx() and getCtx.
     * Defined as private so it can be visualized via the DebugPlugin
     */
    private ctx;
    constructor(manager?: INotificationManager);
    /**
     * Create a new event and start timing, the manager may return null/undefined to indicate that it does not
     * want to monitor this source event.
     * @param src - The source name of the event
     * @param payloadDetails - An optional callback function to fetch the payload details for the event.
     * @param isAsync - Is the event occurring from a async event
     */
    create(src: string, payload?: any, isAsync?: boolean): IPerfEvent | null | undefined;
    /**
     * Complete the perfEvent and fire any notifications.
     * @param perfEvent - Fire the event which will also complete the passed event
     */
    fire(perfEvent: IPerfEvent): void;
    /**
     * Set an execution context value
     * @param key - The context key name
     * @param value - The value
     */
    setCtx(key: string, value: any): void;
    /**
     * Get the execution context value
     * @param key - The context key
     */
    getCtx(key: string): any;
}

export { perfNow }

/**
 * This class will be removed!
 * @deprecated use createProcessTelemetryContext() instead
 */
export declare class ProcessTelemetryContext implements IProcessTelemetryContext {
    /**
     * Gets the current core config instance
     */
    getCfg: () => IConfiguration;
    getExtCfg: <T>(identifier: string, defaultValue?: IConfigDefaults<T>) => T;
    getConfig: (identifier: string, field: string, defaultValue?: number | string | boolean | string[] | RegExp[] | Function) => number | string | boolean | string[] | RegExp[] | Function;
    /**
     * Returns the IAppInsightsCore instance for the current request
     */
    core: () => IAppInsightsCore;
    /**
     * Returns the current IDiagnosticsLogger for the current request
     */
    diagLog: () => IDiagnosticLogger;
    /**
     * Helper to allow inherited classes to check and possibly shortcut executing code only
     * required if there is a nextPlugin
     */
    hasNext: () => boolean;
    /**
     * Returns the next configured plugin proxy
     */
    getNext: () => ITelemetryPluginChain;
    /**
     * Helper to set the next plugin proxy
     */
    setNext: (nextCtx: ITelemetryPluginChain) => void;
    /**
     * Call back for telemetry processing before it it is sent
     * @param env - This is the current event being reported
     * @param itemCtx - This is the context for the current request, ITelemetryPlugin instances
     * can optionally use this to access the current core instance or define / pass additional information
     * to later plugins (vs appending items to the telemetry item)
     * @returns boolean (true) if there is no more plugins to process otherwise false or undefined (void)
     */
    processNext: (env: ITelemetryItem) => boolean | void;
    /**
     * Synchronously iterate over the context chain running the callback for each plugin, once
     * every plugin has been executed via the callback, any associated onComplete will be called.
     * @param callback - The function call for each plugin in the context chain
     */
    iterate: <T extends ITelemetryPlugin = ITelemetryPlugin>(callback: (plugin: T) => void) => void;
    /**
     * Create a new context using the core and config from the current instance
     * @param plugins - The execution order to process the plugins, if null or not supplied
     *                  then the current execution order will be copied.
     * @param startAt - The plugin to start processing from, if missing from the execution
     *                  order then the next plugin will be NOT set.
     */
    createNew: (plugins?: IPlugin[] | ITelemetryPluginChain, startAt?: IPlugin) => IProcessTelemetryContext;
    /**
     * Set the function to call when the current chain has executed all processNext or unloadNext items.
     */
    onComplete: (onComplete: () => void) => void;
    /**
     * Creates a new Telemetry Item context with the current config, core and plugin execution chain
     * @param plugins - The plugin instances that will be executed
     * @param config - The current config
     * @param core - The current core instance
     */
    constructor(pluginChain: ITelemetryPluginChain, config: IConfiguration, core: IAppInsightsCore, startAt?: IPlugin);
}

/**
 * Effectively assigns all enumerable properties (not just own properties) and functions (including inherited prototype) from
 * the source object to the target, it attempts to use proxy getters / setters (if possible) and proxy functions to avoid potential
 * implementation issues by assigning prototype functions as instance ones
 *
 * This method is the primary method used to "update" the snippet proxy with the ultimate implementations.
 *
 * Special ES3 Notes:
 * Updates (setting) of direct property values on the target or indirectly on the source object WILL NOT WORK PROPERLY, updates to the
 * properties of "referenced" object will work (target.context.newValue = 10 => will be reflected in the source.context as it's the
 * same object). ES3 Failures: assigning target.myProp = 3 -> Won't change source.myProp = 3, likewise the reverse would also fail.
 * @param target - The target object to be assigned with the source properties and functions
 * @param source - The source object which will be assigned / called by setting / calling the targets proxies
 * @param chkSet - An optional callback to determine whether a specific property/function should be proxied
 */
export declare function proxyAssign<T, S>(target: T, source: S, chkSet?: (name: string, isFunc?: boolean, source?: S, target?: T) => boolean): T;

/**
 * Creates a proxy function on the target which internally will call the source version with all arguments passed to the target method.
 *
 * @param target - The target object to be assigned with the source properties and functions
 * @param name - The function name that will be added on the target
 * @param source - The source object which will be assigned / called by setting / calling the targets proxies
 * @param theFunc - The function name on the source that will be proxied on the target
 * @param overwriteTarget - If `false` this will not replace any pre-existing name otherwise (the default) it will overwrite any existing name
 */
export declare function proxyFunctionAs<T, S>(target: T, name: string, source: S | (() => S), theFunc: (keyof S), overwriteTarget?: boolean): void;

/**
 * Creates proxy functions on the target which internally will call the source version with all arguments passed to the target method.
 *
 * @param target - The target object to be assigned with the source properties and functions
 * @param source - The source object which will be assigned / called by setting / calling the targets proxies
 * @param functionsToProxy - An array of function names that will be proxied on the target
 * @param overwriteTarget - If false this will not replace any pre-existing name otherwise (the default) it will overwrite any existing name
 */
export declare function proxyFunctions<T, S>(target: T, source: S | (() => S), functionsToProxy: (keyof S)[], overwriteTarget?: boolean): T;

/**
 * generate a random 32-bit number (0x000000..0xFFFFFFFF) or (-0x80000000..0x7FFFFFFF), defaults un-unsigned.
 * @param signed - True to return a signed 32-bit number (-0x80000000..0x7FFFFFFF) otherwise an unsigned one (0x000000..0xFFFFFFFF)
 */
export declare function random32(signed?: boolean): number;

/**
 * Generate a random value between 0 and maxValue, max value should be limited to a 32-bit maximum.
 * So maxValue(16) will produce a number from 0..16 (range of 17)
 * @param maxValue
 */
export declare function randomValue(maxValue: number): number;

/**
 * Trys to remove event handler(s) for the specified event/namespace to the window, body and document
 * @param eventName - {string} - The name of the event, with optional namespaces or just the namespaces,
 * such as "click", "click.mynamespace" or ".mynamespace"
 * @param callback - {any} - - The callback function that needs to be removed from the given event, when using a
 * namespace (with or without a qualifying event) this may be null to remove all previously attached event handlers
 * otherwise this will only remove events with this specific handler.
 * @param evtNamespace - [Optional] Namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace.
 */
export declare function removeEventHandler(eventName: string, callback: any, evtNamespace?: string | string[] | null): void;

/**
 * Remove the listener from the array of events
 * @param events - An string array of event names to bind the listener to
 * @param listener - The event callback to call when the event is triggered
 * @param evtNamespace - [Optional] Namespace(s) to append to the event listeners so they can be uniquely identified and removed based on this namespace.
 */
export declare function removeEventListeners(events: string[], listener: any, evtNamespace?: string | string[]): void;

/**
 * Removes the pageHide event listeners added by addPageHideEventListener, because the 'visibilitychange' uses
 * an internal proxy to detect the visibility state you SHOULD use a unique namespace when calling addPageHideEventListener
 * as the remove ignores the listener argument for the 'visibilitychange' event.
 * @param listener - The specific listener to remove for the 'pageshow' event only (ignored for 'visibilitychange')
 * @param evtNamespace - The unique namespace used when calling addPageShowEventListener
 */
export declare function removePageHideEventListener(listener: any, evtNamespace?: string | string[] | null): void;

/**
 * Removes the pageShow event listeners added by addPageShowEventListener, because the 'visibilitychange' uses
 * an internal proxy to detect the visibility state you SHOULD use a unique namespace when calling addPageShowEventListener
 * as the remove ignores the listener argument for the 'visibilitychange' event.
 * @param listener - The specific listener to remove for the 'pageshow' event only (ignored for 'visibilitychange')
 * @param evtNamespace - The unique namespace used when calling addPageShowEventListener
 */
export declare function removePageShowEventListener(listener: any, evtNamespace?: string | string[] | null): void;

/**
 * Remove any matching 'beforeunload', 'unload' and 'pagehide' events that may have been added via addEventListener,
 * addEventListeners, addPageUnloadEventListener or addPageHideEventListener.
 * @param listener - The specific event callback to to be removed
 * @param evtNamespace - [Optional] Namespace(s) uniquely identified and removed based on this namespace.
 * @returns true - when at least one of the events was registered otherwise false
 */
export declare function removePageUnloadEventListener(listener: any, evtNamespace?: string | string[]): void;

/**
 * Run the unload function of the target object if it exists
 * @param target - The target object that contains the unload function
 * @param isAsync - The caller identifies whether it is expecting the operation to complete synchronously or asynchronously. Even
 * if the caller is not waiting the operation may still be performed asynchronously depending on the component and the reverse is
 * also true.
 * @returns The result of the target function
 */
export declare function runTargetUnload<T>(target: {
    unload?: (isAsync?: boolean) => T;
}, isAsync?: boolean): T;

/**
 * Helper to return the ICookieMgr from the core (if not null/undefined) or a default implementation
 * associated with the configuration or a legacy default.
 * @param core
 * @param config
 * @returns
 */
export declare function safeGetCookieMgr(core: IAppInsightsCore, config?: IConfiguration): ICookieMgr;

export declare function safeGetLogger(core: IAppInsightsCore, config?: IConfiguration): IDiagnosticLogger;

/**
 * The EventsDiscardedReason enumeration contains a set of values that specify the reason for discarding an event.
 */
export declare const enum SendRequestReason {
    /**
     * No specific reason was specified
     */
    Undefined = 0,
    /**
     * Events are being sent based on the normal event schedule / timer.
     */
    NormalSchedule = 1,
    /**
     * A manual flush request was received
     */
    ManualFlush = 1,
    /**
     * Unload event is being processed
     */
    Unload = 2,
    /**
     * The event(s) being sent are sync events
     */
    SyncEvent = 3,
    /**
     * The Channel was resumed
     */
    Resumed = 4,
    /**
     * The event(s) being sent as a retry
     */
    Retry = 5,
    /**
     * The SDK is unloading
     */
    SdkUnload = 6,
    /**
     * Maximum batch size would be exceeded
     */
    MaxBatchSize = 10,
    /**
     * The Maximum number of events have already been queued
     */
    MaxQueuedEvents = 20
}

/**
 * Enable the lookup of test mock objects if requested
 * @param enabled
 */
export declare function setEnableEnvMocks(enabled: boolean): void;

/**
 * Set the global performance manager to use when there is no core instance or it has not been initialized yet.
 * @param perfManager - The IPerfManager instance to use when no performance manager is supplied.
 */
export declare function setGblPerfMgr(perfManager: IPerfManager): void;

/**
 * Sets the provided value on the target instance using the field name when the provided chk function returns true, the chk
 * function will only be called if the new value is no equal to the original value.
 * @param target - The target object
 * @param field - The key of the target
 * @param value - The value to set
 * @param valChk - [Optional] Callback to check the value that if supplied will be called check if the new value can be set
 * @param srcChk - [Optional] Callback to check to original value that if supplied will be called if the new value should be set (if allowed)
 * @returns The existing or new value, depending what was set
 */
export declare function setValue<T, K extends keyof T>(target: T, field: K, value: T[K], valChk?: ((value: T[K]) => boolean) | null, srcChk?: ((value: T[K]) => boolean) | null): T[K];

export declare function sortPlugins<T = IPlugin>(plugins: T[]): T[];

/**
 * A simple wrapper (for minification support) to check if the value contains the search string.
 * @param value - The string value to check for the existence of the search value
 * @param search - The value search within the value
 */
export declare function strContains(value: string, search: string): boolean;

export { strEndsWith }

export { strFunction }

export { strObject }

export { strPrototype }

export { strStartsWith }

export { strTrim }

export { strUndefined }

export declare interface Tags {
    [key: string]: any;
}

export declare type TelemetryInitializerFunction = <T extends ITelemetryItem>(item: T) => boolean | void;

/**
 * The TelemetryUnloadReason enumeration contains the possible reasons for why a plugin is being unloaded / torndown().
 */
export declare const enum TelemetryUnloadReason {
    /**
     * Teardown has been called without any context.
     */
    ManualTeardown = 0,
    /**
     * Just this plugin is being removed
     */
    PluginUnload = 1,
    /**
     * This instance of the plugin is being removed and replaced
     */
    PluginReplace = 2,
    /**
     * The entire SDK is being unloaded
     */
    SdkUnload = 50
}

/**
 * The TelemetryUpdateReason enumeration contains a set of bit-wise values that specify the reason for update request.
 */
export declare const enum TelemetryUpdateReason {
    /**
     * Unknown.
     */
    Unknown = 0,
    /**
     * The configuration has ben updated or changed
     */
    ConfigurationChanged = 1,
    /**
     * One or more plugins have been added
     */
    PluginAdded = 16,
    /**
     * One or more plugins have been removed
     */
    PluginRemoved = 32
}

/**
 * Throws an Aggregation Error which includes all of the errors that led to this error occurring
 * @param message - The message describing the aggregation error (the sourceError details are added to this)
 * @param sourceErrors - An array of the errors that caused this situation
 */
export declare function throwAggregationError(message: string, sourceErrors: any[]): never;

export { throwError }

/**
 * This is a helper method which will call throwInternal on the passed logger, will throw exceptions in
 * debug mode or attempt to log the error as a console warning. This helper is provided mostly to better
 * support minification as logger.throwInternal() will not compress the publish "throwInternal" used throughout
 * the code.
 * @param logger - The Diagnostic Logger instance to use.
 * @param severity - {LoggingSeverity} - The severity of the log message
 * @param message - {_InternalLogMessage} - The log message.
 */
export declare function _throwInternal(logger: IDiagnosticLogger, severity: LoggingSeverity, msgId: _InternalMessageId, msg: string, properties?: Object, isUserAct?: boolean): void;

/**
 * Convert a date to I.S.O. format in IE8
 */
export declare function toISOString(date: Date): string;

export declare function uaDisallowsSameSiteNone(userAgent: string): boolean;

export declare const Undefined = "undefined";

/**
 * Teardown / Unload helper to perform teardown/unloading operations for the provided components synchronously or asynchronously, this will call any
 * _doTeardown() or _doUnload() functions on the provided components to allow them to finish removal.
 * @param components - The components you want to unload
 * @param unloadCtx - This is the context that should be used during unloading.
 * @param unloadState - The details / state of the unload process, it holds details like whether it should be unloaded synchronously or asynchronously and the reason for the unload.
 * @param asyncCallback - An optional callback that the plugin must call if it returns true to inform the caller that it has completed any async unload/teardown operations.
 * @returns boolean - true if the plugin has or will call asyncCallback, this allows the plugin to perform any asynchronous operations.
 */
export declare function unloadComponents(components: any | IUnloadableComponent[], unloadCtx?: IProcessTelemetryUnloadContext, unloadState?: ITelemetryUnloadState, asyncCallback?: () => void): void | boolean;

export declare type UnloadHandler = (itemCtx: IProcessTelemetryUnloadContext, unloadState: ITelemetryUnloadState) => void;

export declare function useXDomainRequest(): boolean | undefined;

/**
 * This is a helper method which will call warnToConsole on the passed logger with the provided message.
 * @param logger - The Diagnostic Logger instance to use.
 * @param message - {_InternalLogMessage} - The log message.
 */
export declare function _warnToConsole(logger: IDiagnosticLogger, message: string): void;

export declare type WatcherFunction<T = IConfiguration> = (details: IWatchDetails<T>) => void;

export { }
