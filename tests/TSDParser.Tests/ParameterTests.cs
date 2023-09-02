namespace TSDParser.Tests;

public class ParameterTests
{
    [Fact]
    public void String()
    {
        var tsd = """name: string""";
        var output = CommonParsers.Parameter.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Function()
    {
        var tsd = """callback: () => void""";
        var output = CommonParsers.Parameter.Parse(tsd);

        output.Name.Text.Should().Be("callback");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void FunctionParam()
    {
        var tsd = """callback: (param: string) => void""";
        var output = CommonParsers.Parameter.Parse(tsd);

        output.Name.Text.Should().Be("callback");
        output.Type.Should().BeOfType<FunctionType>();

        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();

        output.Type.As<FunctionType>().Parameters[0].Should().BeOfType<Parameter>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void FunctionMultiParam()
    {
        var tsd = """callback: (param: string, param2: number) => void""";
        var output = CommonParsers.Parameter.Parse(tsd);

        output.Name.Text.Should().Be("callback");

        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();

        output.Type.As<FunctionType>().Parameters[0].Should().BeOfType<Parameter>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();

        output.Type.As<FunctionType>().Parameters[1].Should().BeOfType<Parameter>();
        output.Type.As<FunctionType>().Parameters[1].Name.Text.Should().Be("param2");
        output.Type.As<FunctionType>().Parameters[1].Type.Should().BeOfType<NumberKeyword>();
    }
}