using TSDParser.Parsers;

namespace TSDParser.Tests;

public class Properties
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

        output.Name.Comment.Should().Be("Property Comment");
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
}