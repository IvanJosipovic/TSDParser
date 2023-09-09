namespace TSDParser.Tests;

public class TSDParserTests
{
    [Fact]
    public async Task TestEmpty()
    {
        var parsed = await TSDParser.ParseDefinition("");
    }

    [Fact]
    public async Task Test1()
    {
        var parsed = await TSDParser.ParseDefinition("""
            export class SomeType {
              method(): void;
            }
            """);
    }

    [Fact]
    public async Task TestTSD()
    {
        var parsed = await TSDParser.ParseDefinition(File.ReadAllText("../../../../../samples/definitions/typescript.d.ts"));
    }

    [Fact]
    public async Task TestFullTSD()
    {
        var parsed = await TSDParser.ParseDefinition(File.ReadAllText("../../../../../samples/definitions/applicationinsights-web.d.ts"));
    }

    [Fact]
    public async Task TestFullTSD2()
    {
        var parsed = await TSDParser.ParseDefinition(File.ReadAllText("../../../../../samples/definitions/applicationinsights-core-js.d.ts"));
    }
}
