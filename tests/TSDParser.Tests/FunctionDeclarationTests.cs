namespace TSDParser.Tests;

public class FunctionDeclarationTests
{
    [Fact]
    public void Empty()
    {
        var tsd = """export declare function __getEvent(): void;""";
        var output = FunctionParsers.FunctionDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("__getEvent");
        output.Kind.Should().Be(SyntaxKind.FunctionDeclaration);
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Param()
    {
        var tsd = """export declare function runTargetUnload(isAsync?: boolean): void;""";
        var output = FunctionParsers.FunctionDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("runTargetUnload");

        output.Parameters[0].Name.Text.Should().Be("isAsync");
        output.Parameters[0].Type.Should().BeOfType<BooleanKeyword>();

        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void TypeLiteral()
    {
        var tsd = """export declare function runTargetUnload<T>(target: { unload?: (isAsync?: boolean) => T; }, isAsync?: boolean): T;""";
        var output = FunctionParsers.FunctionDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("runTargetUnload");

        output.Parameters[0].Name.Text.Should().Be("target");
        output.Parameters[0].Type.Should().BeOfType<TypeLiteral>();
        output.Parameters[0].Type.As<TypeLiteral>().Members[0].Should().BeOfType<PropertySignature>();
        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Name.Text.Should().Be("unload");
        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.Should().BeOfType<FunctionType>();

        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("isAsync");
        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Parameters[0].QuestionToken.Should().NotBeNull();
        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<BooleanKeyword>();

        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Type.Should().BeOfType<TypeReference>();
        output.Parameters[0].Type.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Type.As<TypeReference>().TypeName.Text.Should().Be("T");


        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("T");
    }
}