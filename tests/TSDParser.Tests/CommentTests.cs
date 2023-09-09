namespace TSDParser.Tests;

public class CommentTests
{
    [Fact]
    public async Task Test1()
    {
        var parsed = await TSDParser.ParseDefinition("""
            /** comment */
            export class SomeType {
            }
            """);
    }

    [Fact]
    public async Task Test2()
    {
        var parsed = await TSDParser.ParseDefinition("""
            /**
            * comment
            * @public
            */
            export class SomeType {
            }
            """);
    }

    [Fact]
    public async Task Test3()
    {
        var parsed = await TSDParser.ParseDefinition("""
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
            export class SomeType {
            }
            """);
    }
}
