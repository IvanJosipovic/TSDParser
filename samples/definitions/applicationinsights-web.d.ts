/*
 * Microsoft.ApplicationInsights, 3.0.2
 * Copyright (c) Microsoft and contributors. All rights reserved.
 *
 * Microsoft Application Insights Team
 * https://github.com/microsoft/ApplicationInsights-JS#readme
 *
 * ---------------------------------------------------------------------------
 * This is a single combined (rollup) declaration file for the package,
 * if you require a namespace wrapped version it is also available.
 * - Namespaced version: types/applicationinsights-web.namespaced.d.ts
 * ---------------------------------------------------------------------------
 */

import { AnalyticsPlugin } from '@microsoft/applicationinsights-analytics-js';
import { AppInsightsCore } from '@microsoft/applicationinsights-core-js';
import { ApplicationInsights as ApplicationAnalytics } from '@microsoft/applicationinsights-analytics-js';
import { BaseTelemetryPlugin } from '@microsoft/applicationinsights-core-js';
import { AjaxPlugin as DependenciesPlugin } from '@microsoft/applicationinsights-dependencies-js';
import { DependencyInitializerFunction } from '@microsoft/applicationinsights-dependencies-js';
import { DependencyListenerFunction } from '@microsoft/applicationinsights-dependencies-js';
import { DistributedTracingModes } from '@microsoft/applicationinsights-common';
import { doPerf } from '@microsoft/applicationinsights-core-js';
import { _eInternalMessageId } from '@microsoft/applicationinsights-core-js';
import { eLoggingSeverity } from '@microsoft/applicationinsights-core-js';
import { eSeverityLevel } from '@microsoft/applicationinsights-common';
import { Event as Event_2 } from '@microsoft/applicationinsights-common';
import { Exception } from '@microsoft/applicationinsights-common';
import { IAppInsights } from '@microsoft/applicationinsights-common';
import { IAppInsightsCore } from '@microsoft/applicationinsights-core-js';
import { IAppInsightsInternal } from '@microsoft/applicationinsights-analytics-js';
import { IAutoExceptionTelemetry } from '@microsoft/applicationinsights-common';
import { IConfig } from '@microsoft/applicationinsights-common';
import { IConfiguration } from '@microsoft/applicationinsights-core-js';
import { ICookieMgr } from '@microsoft/applicationinsights-core-js';
import { ICustomProperties } from '@microsoft/applicationinsights-core-js';
import { IDependenciesPlugin } from '@microsoft/applicationinsights-dependencies-js';
import { IDependencyInitializerHandler } from '@microsoft/applicationinsights-dependencies-js';
import { IDependencyListenerHandler } from '@microsoft/applicationinsights-dependencies-js';
import { IDependencyTelemetry } from '@microsoft/applicationinsights-common';
import { IDiagnosticLogger } from '@microsoft/applicationinsights-core-js';
import { IDistributedTraceContext } from '@microsoft/applicationinsights-core-js';
import { IEventTelemetry } from '@microsoft/applicationinsights-common';
import { IExceptionTelemetry } from '@microsoft/applicationinsights-common';
import { ILoadedPlugin } from '@microsoft/applicationinsights-core-js';
import { IMetricTelemetry } from '@microsoft/applicationinsights-common';
import { INotificationListener } from '@microsoft/applicationinsights-core-js';
import { INotificationManager } from '@microsoft/applicationinsights-core-js';
import { IPageViewPerformanceTelemetry } from '@microsoft/applicationinsights-common';
import { IPageViewTelemetry } from '@microsoft/applicationinsights-common';
import { IPerfEvent } from '@microsoft/applicationinsights-core-js';
import { IPerfManager } from '@microsoft/applicationinsights-core-js';
import { IPerfManagerProvider } from '@microsoft/applicationinsights-core-js';
import { IPlugin } from '@microsoft/applicationinsights-core-js';
import { IProcessTelemetryContext } from '@microsoft/applicationinsights-core-js';
import { IPromise } from '@nevware21/ts-async';
import { IPropertiesPlugin } from '@microsoft/applicationinsights-common';
import { IRequestHeaders } from '@microsoft/applicationinsights-common';
import { ITelemetryContext } from '@microsoft/applicationinsights-common';
import { ITelemetryInitializerHandler } from '@microsoft/applicationinsights-core-js';
import { ITelemetryItem } from '@microsoft/applicationinsights-core-js';
import { ITelemetryPlugin } from '@microsoft/applicationinsights-core-js';
import { ITelemetryPluginChain } from '@microsoft/applicationinsights-core-js';
import { ITelemetryUnloadState } from '@microsoft/applicationinsights-core-js';
import { ITraceTelemetry } from '@microsoft/applicationinsights-common';
import { IUnloadHook } from '@microsoft/applicationinsights-core-js';
import { LoggingSeverity } from '@microsoft/applicationinsights-core-js';
import { Metric } from '@microsoft/applicationinsights-common';
import { NotificationManager } from '@microsoft/applicationinsights-core-js';
import { PageView } from '@microsoft/applicationinsights-common';
import { PageViewPerformance } from '@microsoft/applicationinsights-common';
import { PerfEvent } from '@microsoft/applicationinsights-core-js';
import { PerfManager } from '@microsoft/applicationinsights-core-js';
import { PropertiesPlugin } from '@microsoft/applicationinsights-properties-js';
import { RemoteDependencyData } from '@microsoft/applicationinsights-common';
import { Sender } from '@microsoft/applicationinsights-channel-js';
import { SeverityLevel } from '@microsoft/applicationinsights-common';
import { Tags } from '@microsoft/applicationinsights-core-js';
import { Trace } from '@microsoft/applicationinsights-common';
import { UnloadHandler } from '@microsoft/applicationinsights-core-js';
import { WatcherFunction } from '@microsoft/applicationinsights-core-js';

export { AppInsightsCore }

export { ApplicationAnalytics }

/**
 * Application Insights API
 * @class Initialization
 * @implements {IApplicationInsights}
 */
export declare class ApplicationInsights implements IApplicationInsights {
    snippet: Snippet;
    /**
     * Access to the Dynamic Configuration for the current instance
     */
    readonly config: IConfiguration & IConfig;
    readonly appInsights: ApplicationAnalytics;
    readonly core: IAppInsightsCore<IConfiguration & IConfig>;
    readonly context: ITelemetryContext;
    /**
     * An array of the installed plugins that provide a version
     */
    readonly pluginVersionStringArr: string[];
    /**
     * The formatted string of the installed plugins that contain a version number
     */
    readonly pluginVersionString: string;
    constructor(snippet: Snippet);
    /**
     * Get the current cookie manager for this instance
     */
    getCookieMgr(): ICookieMgr;
    /**
     * Log a user action or other occurrence.
     * @param event
     * @param [customProperties]
     * @memberof Initialization
     */
    trackEvent(event: IEventTelemetry, customProperties?: ICustomProperties): void;
    /**
     * Logs that a page, or similar container was displayed to the user.
     * @param pageView
     * @memberof Initialization
     */
    trackPageView(pageView?: IPageViewTelemetry): void;
    /**
     * Log a bag of performance information via the customProperties field.
     * @param pageViewPerformance
     * @memberof Initialization
     */
    trackPageViewPerformance(pageViewPerformance: IPageViewPerformanceTelemetry): void;
    /**
     * Log an exception that you have caught.
     * @param exception
     * @param } customProperties   Additional data used to filter pages and metrics in the portal. Defaults to empty.
     * @memberof Initialization
     */
    trackException(exception: IExceptionTelemetry, customProperties?: ICustomProperties): void;
    /**
     * Manually send uncaught exception telemetry. This method is automatically triggered
     * on a window.onerror event.
     * @param exception
     * @memberof Initialization
     */
    _onerror(exception: IAutoExceptionTelemetry): void;
    /**
     * Log a diagnostic scenario such entering or leaving a function.
     * @param trace
     * @param [customProperties]
     * @memberof Initialization
     */
    trackTrace(trace: ITraceTelemetry, customProperties?: ICustomProperties): void;
    /**
     * Log a numeric value that is not associated with a specific event. Typically used
     * to send regular reports of performance indicators.
     *
     * To send a single measurement, just use the `name` and `average` fields
     * of {@link IMetricTelemetry}.
     *
     * If you take measurements frequently, you can reduce the telemetry bandwidth by
     * aggregating multiple measurements and sending the resulting average and modifying
     * the `sampleCount` field of {@link IMetricTelemetry}.
     * @param metric - input object argument. Only `name` and `average` are mandatory.
     * @param [customProperties]
     * @memberof Initialization
     */
    trackMetric(metric: IMetricTelemetry, customProperties?: ICustomProperties): void;
    /**
     * Starts the timer for tracking a page load time. Use this instead of `trackPageView` if you want to control when the page view timer starts and stops,
     * but don't want to calculate the duration yourself. This method doesn't send any telemetry. Call `stopTrackPage` to log the end of the page view
     * and send the event.
     * @param name - A string that idenfities this item, unique within this HTML document. Defaults to the document title.
     */
    startTrackPage(name?: string): void;
    /**
     * Stops the timer that was started by calling `startTrackPage` and sends the pageview load time telemetry with the specified properties and measurements.
     * The duration of the page view will be the time between calling `startTrackPage` and `stopTrackPage`.
     * @param   name  The string you used as the name in startTrackPage. Defaults to the document title.
     * @param   url   String - a relative or absolute URL that identifies the page or other item. Defaults to the window location.
     * @param   properties  map[string, string] - additional data used to filter pages and metrics in the portal. Defaults to empty.
     * @param   measurements    map[string, number] - metrics associated with this page, displayed in Metrics Explorer on the portal. Defaults to empty.
     */
    stopTrackPage(name?: string, url?: string, customProperties?: {
        [key: string]: any;
    }, measurements?: {
        [key: string]: number;
    }): void;
    startTrackEvent(name?: string): void;
    /**
     * Log an extended event that you started timing with `startTrackEvent`.
     * @param   name    The string you used to identify this event in `startTrackEvent`.
     * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
     * @param   measurements    map[string, number] - metrics associated with this event, displayed in Metrics Explorer on the portal. Defaults to empty.
     */
    stopTrackEvent(name: string, properties?: {
        [key: string]: string;
    }, measurements?: {
        [key: string]: number;
    }): void;
    addTelemetryInitializer(telemetryInitializer: (item: ITelemetryItem) => boolean | void): ITelemetryInitializerHandler;
    /**
     * Set the authenticated user id and the account id. Used for identifying a specific signed-in user. Parameters must not contain whitespace or ,;=|
     *
     * The method will only set the `authenticatedUserId` and `accountId` in the current page view. To set them for the whole session, you should set `storeInCookie = true`
     * @param authenticatedUserId
     * @param [accountId]
     * @param [storeInCookie=false]
     */
    setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean): void;
    /**
     * Clears the authenticated user id and account id. The associated cookie is cleared, if present.
     */
    clearAuthenticatedUserContext(): void;
    /**
     * Log a dependency call (e.g. ajax)
     * @param dependency
     * @memberof Initialization
     */
    trackDependencyData(dependency: IDependencyTelemetry): void;
    /**
     * Attempt to flush data immediately; If executing asynchronously (the default) and
     * you DO NOT pass a callback function then a [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will be returned which will resolve once the flush is complete. The actual implementation of the `IPromise`
     * will be a native Promise (if supported) or the default as supplied by [ts-async library](https://github.com/nevware21/ts-async)
     * @param async - send data asynchronously when true
     * @param callBack - if specified, notify caller when send is complete, the channel should return true to indicate to the caller that it will be called.
     * If the caller doesn't return true the caller should assume that it may never be called.
     * @returns - If a callback is provided `true` to indicate that callback will be called after the flush is complete otherwise the caller
     * should assume that any provided callback will never be called, Nothing or if occurring asynchronously a
     * [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) which will be resolved once the unload is complete,
     * the [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) will only be returned when no callback is provided
     * and async is true.
     */
    flush(async?: boolean, callBack?: () => void): void | IPromise<void>;
    /**
     * Manually trigger an immediate send of all telemetry still in the buffer using beacon Sender.
     * Fall back to xhr sender if beacon is not supported.
     * @param [async=true]
     * @memberof Initialization
     */
    onunloadFlush(async?: boolean): void;
    /**
     * Initialize this instance of ApplicationInsights
     * @returns {IApplicationInsights}
     * @memberof Initialization
     * @param legacyMode - MUST always be false, it is no longer supported from v3.x onwards
     */
    loadAppInsights(legacyMode?: boolean, logger?: IDiagnosticLogger, notificationManager?: INotificationManager): IApplicationInsights;
    /**
     * Overwrite the lazy loaded fields of global window snippet to contain the
     * actual initialized API methods
     * @param snippet
     * @memberof Initialization
     */
    updateSnippetDefinitions(snippet: Snippet): void;
    /**
     * Call any functions that were queued before the main script was loaded
     * @memberof Initialization
     */
    emptyQueue(): void;
    pollInternalLogs(): void;
    stopPollingInternalLogs(): void;
    addHousekeepingBeforeUnload(appInsightsInstance: IApplicationInsights): void;
    getSender(): Sender;
    /**
     * Unload and Tear down the SDK and any initialized plugins, after calling this the SDK will be considered
     * to be un-initialized and non-operational, re-initializing the SDK should only be attempted if the previous
     * unload call return `true` stating that all plugins reported that they also unloaded, the recommended
     * approach is to create a new instance and initialize that instance.
     * This is due to possible unexpected side effects caused by plugins not supporting unload / teardown, unable
     * to successfully remove any global references or they may just be completing the unload process asynchronously.
     * If you pass isAsync as true and do not provide
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
     * @param mergeExisting - Should the new configuration merge with the existing or just replace it. Default is to merge.
     */
    updateCfg<T extends IConfiguration = IConfiguration>(newConfig: T, mergeExisting?: boolean): void;
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
     * Add an ajax listener which is called just prior to the request being sent and before the correlation headers are added, to allow you
     * to access the headers and modify the values used to generate the distributed tracing correlation headers. (added in v2.8.4)
     * @param dependencyListener - The Telemetry Initializer function
     * @returns - A IDependencyListenerHandler to enable the initializer to be removed
     */
    addDependencyListener(dependencyListener: DependencyListenerFunction): IDependencyListenerHandler;
    /**
     * Add an dependency telemetry initializer callback function to allow populating additional properties or drop the request.
     * It is called after the dependency call has completed and any available performance details are available. A dependency
     * initializer is similar to the TelemetryInitializer function but it allows you to block the reporting of the dependency
     * request so that it doesn't count against the `maxAjaxCallsPerView`.
     * @param dependencyInitializer - The Dependency Telemetry Initializer function
     * @returns - A IDependencyInitializerHandler to enable the initializer to be removed
     */
    addDependencyInitializer(dependencyInitializer: DependencyInitializerFunction): IDependencyInitializerHandler;
    /**
     * Gets the current distributed trace context for this instance if available
     */
    getTraceCtx(): IDistributedTraceContext | null | undefined;
    /**
     * Watches and tracks changes for accesses to the current config, and if the accessed config changes the
     * handler will be recalled.
     * @param handler
     * @returns A watcher handler instance that can be used to remove itself when being unloaded
     */
    onCfgChange(handler: WatcherFunction<IConfiguration>): IUnloadHook;
}

export declare class ApplicationInsightsContainer {
    static getAppInsights(snippet: Snippet, version: number): IApplicationInsights;
}

export { BaseTelemetryPlugin }

export { DependenciesPlugin }

export { DependencyInitializerFunction }

export { DependencyListenerFunction }

export { DistributedTracingModes }

export { doPerf }

export { _eInternalMessageId }

export { eLoggingSeverity }

export { eSeverityLevel }

export { Event_2 as Event }

export { Exception }

export { IAppInsights }

export { IAppInsightsCore }

export { IAppInsightsInternal }

export declare interface IApplicationInsights extends IAppInsights, IDependenciesPlugin, IPropertiesPlugin {
    appInsights: AnalyticsPlugin;
    /**
     * Attempt to flush data immediately; If executing asynchronously (the default) and
     * you DO NOT pass a callback function then a [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html)
     * will be returned which will resolve once the flush is complete. The actual implementation of the `IPromise`
     * will be a native Promise (if supported) or the default as supplied by [ts-async library](https://github.com/nevware21/ts-async)
     * @param async - send data asynchronously when true
     * @param callBack - if specified, notify caller when send is complete, the channel should return true to indicate to the caller that it will be called.
     * If the caller doesn't return true the caller should assume that it may never be called.
     * @returns - If a callback is provided `true` to indicate that callback will be called after the flush is complete otherwise the caller
     * should assume that any provided callback will never be called, Nothing or if occurring asynchronously a
     * [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) which will be resolved once the unload is complete,
     * the [IPromise](https://nevware21.github.io/ts-async/typedoc/interfaces/IPromise.html) will only be returned when no callback is provided
     * and async is true.
     */
    flush: (async?: boolean, callBack?: () => void) => void | IPromise<void>;
    onunloadFlush: (async?: boolean) => void;
    getSender: () => Sender;
    setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean): void;
    clearAuthenticatedUserContext(): void;
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
     * @param replaceExisting - should any existing plugin be replaced
     * @param doAsync - Should the add be performed asynchronously
     */
    addPlugin<T extends IPlugin = ITelemetryPlugin>(plugin: T, replaceExisting: boolean, doAsync: boolean, addCb?: (added?: boolean) => void): void;
    /**
     * Update the configuration used and broadcast the changes to all loaded plugins, this does NOT support updating, adding or removing
     * any the plugins. It will notify (if supported) that the configuration has changed but it will not remove or add any new plugins
     * @param newConfig - The new configuration is apply
     * @param mergeExisting - Should the new configuration merge with the existing or just replace it. Default is to merge.
     */
    updateCfg<T extends IConfiguration = IConfiguration>(newConfig: T, mergeExisting?: boolean): void;
    /**
     * Returns the unique event namespace that should be used when registering events
     */
    evtNamespace(): string;
    /**
     * Add a handler that will be called when the SDK is being unloaded
     * @param handler - the handler
     */
    addUnloadCb(handler: UnloadHandler): void;
}

export { IAutoExceptionTelemetry }

export { IConfig }

export { IConfiguration }

export { ICustomProperties }

export { IDependenciesPlugin }

export { IDependencyInitializerHandler }

export { IDependencyListenerHandler }

export { IDependencyTelemetry }

export { IDiagnosticLogger }

export { IEventTelemetry }

export { IExceptionTelemetry }

export { IMetricTelemetry }

export { INotificationListener }

export { INotificationManager }

export { IPageViewPerformanceTelemetry }

export { IPageViewTelemetry }

export { IPerfEvent }

export { IPerfManager }

export { IPerfManagerProvider }

export { IPlugin }

export { IProcessTelemetryContext }

export { IRequestHeaders }

export { ITelemetryItem }

export { ITelemetryPlugin }

export { ITelemetryPluginChain }

export { ITraceTelemetry }

export { LoggingSeverity }

export { Metric }

export { NotificationManager }

export { PageView }

export { PageViewPerformance }

export { PerfEvent }

export { PerfManager }

export { PropertiesPlugin }

export { RemoteDependencyData }

export { Sender }

export { SeverityLevel }

/**
 *
 * @export
 * @interface Snippet
 */
export declare interface Snippet {
    config: IConfiguration & IConfig;
    queue?: Array<() => void>;
    sv?: string;
    version?: number;
}

export { Tags }

export { Trace }

export { }
