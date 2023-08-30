using TSDParser.Parsers;

namespace TSDParser.Tests;

public class Types
{
    [Fact]
    public void Boolean()
    {
        var tsd = """boolean""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<BooleanKeyword>();
        output.As<BooleanKeyword>().Kind.Should().Be(SyntaxKind.BooleanKeyword);

    }

    [Fact]
    public void Number()
    {
        var tsd = """number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void Any()
    {
        var tsd = """any""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<AnyKeyword>();
    }

    [Fact]
    public void Null()
    {
        var tsd = """null""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<NullKeyword>();
    }

    [Fact]
    public void Undefined()
    {
        var tsd = """undefined""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UndefinedKeyword>();
    }

    [Fact]
    public void Class()
    {
        var tsd = """SomeClass""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().Kind.Should().Be(SyntaxKind.TypeReference);
    }

    [Fact]
    public void Void()
    {
        var tsd = """void""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void String()
    {
        var tsd = """string""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Array()
    {
        var tsd = """string[]""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<ArrayType>();
        output.As<ArrayType>().ElementType.Should().BeOfType<StringKeyword>();
        output.As<ArrayType>().Kind.Should().Be(SyntaxKind.ArrayType);
    }

    [Fact]
    public void KeyValuePair()
    {
        var tsd = """{ [key: string]: number; }""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeLiteral>();
        output.As<TypeLiteral>().Members[0].Should().BeOfType<IndexSignature>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Type.Should().BeOfType<NumberKeyword>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Parameters[0].Should().BeOfType<Parameter>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Parameters[0].As<Parameter>().Name.Text.Should().Be("key");
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Parameters[0].As<Parameter>().Type.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Generic()
    {
        var tsd = """One<Two>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("One");
        output.As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("Two");
    }

    [Fact]
    public void GenericKeyword()
    {
        var tsd = """One<number>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("One");
        output.As<TypeReference>().TypeArguments[0].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void GenericMultiple()
    {
        var tsd = """One<Two,Three>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("One");
        output.As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("Two");
        output.As<TypeReference>().TypeArguments[1].Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeArguments[1].As<TypeReference>().TypeName.Text.Should().Be("Three");
    }

    //        [Fact]
    //        public void Union()
    //        {
    //            var tsd = """string | number""";
    //            var output = TSDParser.Types.Parse(tsd);

    //            output[0].Name.Should().Be("string");
    //            output[1].Name.Should().Be("number");
    //        }

    //        [Fact]
    //        public void UnionArray()
    //        {
    //            var tsd = """string[] | number[]""";
    //            var output = TSDParser.Types.Parse(tsd);

    //            output[0].Name.Should().Be("string");
    //            output[0].IsArray.Should().BeTrue();

    //            output[1].Name.Should().Be("number");
    //            output[1].IsArray.Should().BeTrue();
    //        }

    //        [Fact]
    //        public void UnionNoSpaces()
    //        {
    //            var tsd = """string|number""";
    //            var output = TSDParser.Types.Parse(tsd);

    //            output[0].Name.Should().Be("string");
    //            output[1].Name.Should().Be("number");
    //        }

    //        [Fact]
    //        public void Intersection()
    //        {
    //            var tsd = """string & number""";
    //            var output = TSDParser.Types.Parse(tsd);

    //            output[0].Name.Should().Be("string");
    //            output[1].Name.Should().Be("number");
    //        }

    //        [Fact]
    //        public void IntersectionNoSpaces()
    //        {
    //            var tsd = """string&number""";
    //            var output = TSDParser.Types.Parse(tsd);

    //            output[0].Name.Should().Be("string");
    //            output[1].Name.Should().Be("number");
    //        }
}