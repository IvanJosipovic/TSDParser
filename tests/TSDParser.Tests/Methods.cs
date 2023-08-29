namespace TSDParser.Tests;

public class Methods
{
    [Fact]
    public void Void()
    {
        var tsd = """myFunc(): void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void VoidNoSpace()
    {
        var tsd = """myFunc():void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void VoidNoSemiColon()
    {
        var tsd = """myFunc(): void""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Comments()
    {
        var tsd = """
            /* myComment */
            myFunc(): void;
            """;
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Name.Comment.Should().Be("myComment");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Parameter()
    {
        var tsd = """myFunc(param: string): void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void MultiParameter()
    {
        var tsd = """myFunc(param: string, param2: number): void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<StringKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[1].Name.Text.Should().Be("param2");
        output.Parameters[1].Type.Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void Nullable()
    {
        var tsd = """myFunc(param?: string): void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.Parameters[0].QuestionToken.Should().NotBeNull();
    }

    [Fact]
    public void ParameterFunction()
    {
        var tsd = """myFunc(callBack: () => void): void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("callBack");
        output.Parameters[0].Type.Should().BeOfType<FunctionType>();
        output.Parameters[0].Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void ParameterFunctionParameters()
    {
        var tsd = """myFunc(callback: (param: string) => void): void;""";
        var output = TSDParser.MethodSignature.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("callback");
        output.Parameters[0].Type.Should().BeOfType<FunctionType>();
        output.Parameters[0].Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Type.As<FunctionType>().Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }
}