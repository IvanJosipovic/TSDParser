namespace TSDParser.Tests;

/// <summary>
/// Used in Interfaces
/// </summary>
public class PropertySignatureTests
{
    [Fact]
    public void String()
    {
        var tsd = """name: string;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void StringNoSemiColen()
    {
        var tsd = """name: string""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Void()
    {
        var tsd = """name: void;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void NoSpace()
    {
        var tsd = """name:string;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Array()
    {
        var tsd = """name: string[];""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<ArrayType>();
        output.Type.As<ArrayType>().ElementType.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void KeyValuePair()
    {
        var tsd = """name: { [key: string]: number; };""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<TypeLiteral>();
    }

    [Fact]
    public void Comments()
    {
        var tsd = """
            /* Property Comment */
            name: string;
            """;
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.JSDoc.Comment.Should().Be("Property Comment");
    }

    [Fact]
    public void Nullable()
    {
        var tsd = """name?: SomeClass;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.QuestionToken.Should().NotBeNull();
        output.QuestionToken.Kind.Should().Be(SyntaxKind.QuestionToken);
        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("SomeClass");
    }

    [Fact]
    public void Readonly()
    {
        var tsd = """readonly name: SomeClass;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("SomeClass");
        output.Modifiers[0].Should().BeOfType<ReadonlyKeyword>();
        output.Modifiers[0].As<ReadonlyKeyword>().Kind.Should().Be(SyntaxKind.ReadonlyKeyword);
    }

    [Fact]
    public void FunctionTypeVoid()
    {
        var tsd = """name: () => void;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Kind.Should().Be(SyntaxKind.PropertySignature);
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Kind.Should().Be(SyntaxKind.FunctionType);
    }

    [Fact]
    public void FunctionTypeVoidNoSpace()
    {
        var tsd = """name:()=>void;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void FunctionTypeParameter()
    {
        var tsd = """name: (param: string) => void;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void FunctionTypeMultiParameter()
    {
        var tsd = """name: (param: string, param2: number) => void;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.Type.As<FunctionType>().Parameters[1].Name.Text.Should().Be("param2");
        output.Type.As<FunctionType>().Parameters[1].Type.Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void FunctionTypeNullable()
    {
        var tsd = """name: (param?: string) => void;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");
        output.Type.Should().BeOfType<FunctionType>();
        output.Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
        output.Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.Type.As<FunctionType>().Parameters[0].QuestionToken.Should().NotBeNull();
    }

    [Fact]
    public void GenericFunctionType()
    {
        var tsd = """name: Test<() => void>;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("Test");
        output.Type.As<TypeReference>().TypeArguments[0].Should().BeOfType<FunctionType>();
        output.Type.As<TypeReference>().TypeArguments[0].As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void GenericParamFunctionType()
    {
        var tsd = """name: Test<(param: string) => void>;""";
        var output = PropertyParsers.PropertySignature.Parse(tsd);

        output.Name.Text.Should().Be("name");

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("Test");
        output.Type.As<TypeReference>().TypeArguments[0].Should().BeOfType<FunctionType>();
        output.Type.As<TypeReference>().TypeArguments[0].As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.Type.As<TypeReference>().TypeArguments[0].As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.Type.As<TypeReference>().TypeArguments[0].As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }
}