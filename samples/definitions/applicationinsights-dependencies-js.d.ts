/*
 * Microsoft Application Insights XHR dependencies plugin, 3.0.2
 * Copyright (c) Microsoft and contributors. All rights reserved.
 *
 * Microsoft Application Insights Team
 * https://github.com/microsoft/ApplicationInsights-JS#readme
 *
 * ---------------------------------------------------------------------------
 * This is a single combined (rollup) declaration file for the package,
 * if you require a namespace wrapped version it is also available.
 * - Namespaced version: types/applicationinsights-dependencies-js.namespaced.d.ts
 * ---------------------------------------------------------------------------
 */

import { BaseTelemetryPlugin } from '@microsoft/applicationinsights-core-js';
import { IAppInsightsCore } from '@microsoft/applicationinsights-core-js';
import { IConfig } from '@microsoft/applicationinsights-common';
import { IConfiguration } from '@microsoft/applicationinsights-core-js';
import { IDependencyTelemetry } from '@microsoft/applicationinsights-common';
import { IDiagnosticLogger } from '@microsoft/applicationinsights-core-js';
import { IDistributedTraceContext } from '@microsoft/applicationinsights-core-js';
import { IPlugin } from '@microsoft/applicationinsights-core-js';
import { IProcessTelemetryContext } from '@microsoft/applicationinsights-core-js';
import { ITelemetryItem } from '@microsoft/applicationinsights-core-js';
import { ITelemetryPluginChain } from '@microsoft/applicationinsights-core-js';

export declare class AjaxPlugin extends BaseTelemetryPlugin implements IDependenciesPlugin, IInstrumentationRequirements, IDependencyListenerContainer {
    static identifier: string;
    identifier: string;
    priority: number;
    constructor();
    initialize(config: IConfiguration & IConfig, core: IAppInsightsCore, extensions: IPlugin[], pluginChain?: ITelemetryPluginChain): void;
    processTelemetry(item: ITelemetryItem, itemCtx?: IProcessTelemetryContext): void;
    /**
     * Logs dependency call
     * @param dependencyData - dependency data object
     */
    trackDependencyData(dependency: IDependencyTelemetry, properties?: {
        [key: string]: any;
    }): void;
    includeCorrelationHeaders(ajaxData: ajaxRecord, input?: Request | string, init?: RequestInit, xhr?: XMLHttpRequestInstrumented): any;
    /**
     * Add an ajax listener which is called just prior to the request being sent and before the correlation headers are added, to allow you
     * to access the headers and modify the values used to generate the distributed tracing correlation headers.
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
     * Protected function to allow sub classes the chance to add additional properties to the dependency event
     * before it's sent. This function calls track, so sub-classes must call this function after they have
     * populated their properties.
     * @param dependencyData - dependency data object
     */
    protected trackDependencyDataInternal(dependency: IDependencyTelemetry, properties?: {
        [key: string]: any;
    }, systemProperties?: {
        [key: string]: any;
    }): void;
}

export declare class ajaxRecord {
    completed: boolean;
    requestHeadersSize: number;
    requestHeaders: any;
    responseReceivingDuration: number;
    callbackDuration: number;
    ajaxTotalDuration: number;
    aborted: number;
    pageUrl: string;
    requestUrl: string;
    requestSize: number;
    method: string;
    perfMark: PerformanceMark;
    perfTiming: PerformanceResourceTiming;
    perfAttempts?: number;
    async?: boolean;
    errorStatusText?: boolean;
    status: string | number;
    requestSentTime: number;
    responseStartedTime: number;
    responseFinishedTime: number;
    callbackFinishedTime: number;
    endTime: number;
    xhrMonitoringState: XHRMonitoringState;
    clientFailure: number;
    /**
     * The traceId to use for the dependency call
     */
    traceID: string;
    /**
     * The spanId to use for the dependency call
     */
    spanID: string;
    /**
     * The traceFlags to use for the dependency call
     */
    traceFlags?: number;
    /**
     * The trace context to use for reporting the remote dependency call
     */
    eventTraceCtx: ITraceCtx;
    /**
     * The listener assigned context values that will be passed to any dependency initializer
     */
    context?: {
        [key: string]: any;
    };
    constructor(traceId: string, spanId: string, logger: IDiagnosticLogger, traceCtx?: IDistributedTraceContext);
    getAbsoluteUrl(): string;
    getPathName(): string;
    CreateTrackItem(ajaxType: string, enableRequestHeaderTracking: boolean, getResponse: () => IAjaxRecordResponse): IDependencyTelemetry;
    getPartAProps(): {
        [key: string]: any;
    };
}

/**
 * The initializer function that will be called, if it returns false the event will be dropped and not reported
 * or counted against the `maxAjaxCallsPerView`.
 */
export declare type DependencyInitializerFunction = (item: IDependencyInitializerDetails) => boolean | void;

/**
 * The function that will get called when the ajax request is about to occur.
 */
export declare type DependencyListenerFunction = (dependencyDetails: IDependencyListenerDetails) => void;

export declare const DfltAjaxCorrelationHeaderExDomains: string[];

declare const _DYN_HEADER_MAP = "headerMap";

declare const _DYN_INCLUDE_CORRELATION_2 = "includeCorrelationHeaders";

declare interface IAjaxRecordResponse {
    statusText: string;
    [_DYN_HEADER_MAP]: Object;
    correlationContext: string;
    type?: string;
    responseText?: string;
    response?: Object;
}

export declare interface IDependenciesPlugin extends IDependencyListenerContainer {
    /**
     * Logs dependency call
     * @param dependencyData - dependency data object
     */
    trackDependencyData(dependency: IDependencyTelemetry): void;
}

export declare interface IDependencyHandler {
    remove(): void;
}

export declare interface IDependencyInitializerDetails {
    /**
     * The DependencyTelemetry event that will be passed to the `trackDependencyDataInternal` function.
     */
    item: IDependencyTelemetry;
    /**
     * Additional properties to be added to the event
     */
    properties?: {
        [key: string]: any;
    };
    /**
     * Additional system properties to be added to the event.
     */
    sysProperties?: {
        [key: string]: any;
    };
    /**
     * The context that the application can assigned via the dependency listener(s)
     */
    context?: {
        [key: string]: any;
    };
    /**
     * [Optional] A flag that indicates whether the client request was manually aborted by the `abort()`
     */
    aborted?: boolean;
}

export declare interface IDependencyInitializerHandler extends IDependencyHandler {
}

declare interface IDependencyListenerContainer {
    /**
     * Add an ajax listener which is called just prior to the request being sent and before the correlation headers are added, to allow you
     * to access the headers and modify the values used to generate the distributed tracing correlation headers. (added in v2.8.4)
     * @param dependencyListener - The Telemetry Initializer function
     * @returns - A IDependencyListenerHandler to enable the initializer to be removed
     */
    addDependencyListener(dependencyListener: DependencyListenerFunction): IDependencyListenerHandler;
}

export declare interface IDependencyListenerDetails {
    /**
     * The current core instance
     */
    core: IAppInsightsCore;
    /**
     * Provided only if the dependency request is an XHR call
     */
    xhr?: XMLHttpRequest;
    /**
     * Provided only if the dependency request is a fetch call, this is the input argument being used,
     * re-assigning this value has not affect on the value used for the request, however, when this is a Request
     * object changing the value of the Request will be used for the outbound request.
     */
    input?: Request | string;
    /**
     * Provided only if the dependency request is a fetch call, this is the init argument being used,
     * re-assigning this value does not change the value used for the request, however, changing properties
     * of this object will be used.
     */
    init?: RequestInit;
    /**
     * Returns the unique identifier for a trace. All requests / spans from the same trace share the same traceId.
     * Must be read from incoming headers or generated according to the W3C TraceContext specification,
     * in a hex representation of 16-byte array. A.k.a. trace-id, TraceID or Distributed TraceID
     */
    traceId?: string;
    /**
     * Self-generated 8-bytes identifier of the incoming request. Must be a hex representation of 8-byte array.
     * Also know as the parentId, used to link requests together
     */
    spanId?: string;
    /**
     * An integer representation of the W3C TraceContext trace-flags.
     * https://www.w3.org/TR/trace-context/#trace-flags
     */
    traceFlags?: number;
    /**
     * [Optional] Context that the application can assign that will also be passed to any dependency initializer
     */
    context?: {
        [key: string]: any;
    };
    /**
     * [Optional] A flag that indicates whether the client request was manually aborted by the `abort()`,
     * as listeners are called just before the request is sent it is unlikely that an application would have
     * called `abort` before `send` this is also available in the dependency initializer.
     */
    aborted?: boolean;
}

export declare interface IDependencyListenerHandler extends IDependencyHandler {
}

export declare interface IInstrumentationRequirements extends IDependenciesPlugin {
    [_DYN_INCLUDE_CORRELATION_2]: (ajaxData: ajaxRecord, input?: Request | string, init?: RequestInit, xhr?: XMLHttpRequestInstrumented) => any;
}

declare interface ITraceCtx {
    traceId: string;
    spanId: string;
    traceFlags: number;
}

declare class XHRMonitoringState {
    openDone: boolean;
    setRequestHeaderDone: boolean;
    sendDone: boolean;
    abortDone: boolean;
    stateChangeAttached: boolean;
    constructor();
}

export declare interface XMLHttpRequestInstrumented extends XMLHttpRequest {
    ajaxData: ajaxRecord;
}

export { }