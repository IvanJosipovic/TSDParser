using TSDParser.Parsers;

namespace TSDParser.Tests;

public class MethodDeclarationTests
{
    [Fact]
    public void Void()
    {
        var tsd = """myFunc(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Kind.Should().Be(SyntaxKind.MethodDeclaration);
        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void VoidNoSpace()
    {
        var tsd = """myFunc():void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void VoidNoSemiColon()
    {
        var tsd = """myFunc(): void""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Nullable()
    {
        var tsd = """myFunc?(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Kind.Should().Be(SyntaxKind.MethodDeclaration);
        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();
        output.QuestionToken.Should().NotBeNull();
    }

    [Fact]
    public void Comments()
    {
        var tsd = """
            /* myComment */
            myFunc(): void;
            """;
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.JSDoc.Comment.Should().Be("myComment");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Parameter()
    {
        var tsd = """myFunc(param: string): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");
        output.Type.Should().BeOfType<VoidKeyword>();

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Kind.Should().Be(SyntaxKind.Parameter);
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void MultiParameter()
    {
        var tsd = """myFunc(param: string, param2: number): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

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
    public void NullableParameter()
    {
        var tsd = """myFunc(param?: string): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

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
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

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
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

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

    [Fact]
    public void Generic()
    {
        var tsd = """myFunc<Type>(param: Type): Type;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");

        output.TypeParameters[0].Should().BeOfType<TypeParameter>();
        output.TypeParameters[0].As<TypeParameter>().Kind.Should().Be(SyntaxKind.TypeParameter);
        output.TypeParameters[0].As<TypeParameter>().Name.Text.Should().Be("Type");

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<TypeReference>();
        output.Parameters[0].Type.As<TypeReference>().TypeName.Text.Should().Be("Type");

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("Type");
    }

    [Fact]
    public void GenericMultiple()
    {
        var tsd = """myFunc<Type,Type2>(param: Type): Type;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");

        output.TypeParameters[0].Should().BeOfType<TypeParameter>();
        output.TypeParameters[0].As<TypeParameter>().Kind.Should().Be(SyntaxKind.TypeParameter);
        output.TypeParameters[0].As<TypeParameter>().Name.Text.Should().Be("Type");

        output.TypeParameters[1].Should().BeOfType<TypeParameter>();
        output.TypeParameters[1].As<TypeParameter>().Kind.Should().Be(SyntaxKind.TypeParameter);
        output.TypeParameters[1].As<TypeParameter>().Name.Text.Should().Be("Type2");

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<TypeReference>();
        output.Parameters[0].Type.As<TypeReference>().TypeName.Text.Should().Be("Type");

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("Type");
    }

    [Fact]
    public void GenericConstraint()
    {
        var tsd = """myFunc<T extends IPlugin>(param: string): ILoadedPlugin<T>;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");

        output.TypeParameters[0].Should().BeOfType<TypeParameter>();
        output.TypeParameters[0].As<TypeParameter>().Kind.Should().Be(SyntaxKind.TypeParameter);
        output.TypeParameters[0].As<TypeParameter>().Name.Text.Should().Be("T");
        output.TypeParameters[0].As<TypeParameter>().Constraint.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].As<TypeParameter>().Constraint.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<StringKeyword>();

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("ILoadedPlugin");
        output.Type.As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void GenericDefaultConstraint()
    {
        var tsd = """myFunc<T extends IPlugin = IPlugin>(param: string): ILoadedPlugin<T>;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Name.Text.Should().Be("myFunc");

        output.TypeParameters[0].Should().BeOfType<TypeParameter>();
        output.TypeParameters[0].As<TypeParameter>().Kind.Should().Be(SyntaxKind.TypeParameter);
        output.TypeParameters[0].As<TypeParameter>().Name.Text.Should().Be("T");

        output.TypeParameters[0].As<TypeParameter>().Constraint.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].As<TypeParameter>().Constraint.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");

        output.TypeParameters[0].As<TypeParameter>().Default.Should().BeOfType<TypeReference>();
        output.TypeParameters[0].As<TypeParameter>().Default.As<TypeReference>().TypeName.Text.Should().Be("IPlugin");

        output.Parameters[0].Should().BeOfType<Parameter>();
        output.Parameters[0].Name.Text.Should().Be("param");
        output.Parameters[0].Type.Should().BeOfType<StringKeyword>();

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("ILoadedPlugin");
        output.Type.As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void Static()
    {
        var tsd = """static myFunc(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Modifiers[0].Should().BeOfType<StaticKeyword>();
    }

    [Fact]
    public void Protected()
    {
        var tsd = """protected myFunc(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Modifiers[0].Should().BeOfType<ProtectedKeyword>();
    }

    [Fact]
    public void Private()
    {
        var tsd = """private myFunc(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Modifiers[0].Should().BeOfType<PrivateKeyword>();
    }

    [Fact]
    public void Abstract()
    {
        var tsd = """abstract myFunc(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Modifiers[0].Should().BeOfType<FirstContextualKeyword>();
    }

    [Fact]
    public void ProtectedAbstract()
    {
        var tsd = """protected abstract myFunc(): void;""";
        var output = MethodParsers.MethodDeclaration.Parse(tsd);

        output.Modifiers[0].Should().BeOfType<ProtectedKeyword>();
        output.Modifiers[1].Should().BeOfType<FirstContextualKeyword>();
    }
}