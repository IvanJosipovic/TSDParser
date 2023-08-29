namespace TSDParser.Tests;

public class PropertyFunctions
{
    [Fact]
    public void Void()
    {
        var tsd = """name: () => void;""";
        var output = TSDParser.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void VoidNoSpace()
    {
        var tsd = """name:()=>void;""";
        var output = TSDParser.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Parameter()
    {
        var tsd = """name: (param: string) => void;""";
        var output = TSDParser.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void MultiParameter()
    {
        var tsd = """name: (param: string, param2: number) => void;""";
        var output = TSDParser.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.Type.As<FunctionType>().Parameters[1].Name.Text.Should().Be("param2");
        output.Type.As<FunctionType>().Parameters[1].Type.Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void Nullable()
    {
        var tsd = """name: (param?: string) => void;""";
        var output = TSDParser.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.Type.As<FunctionType>().Parameters[0].QuestionToken.Should().NotBeNull();

    }
}