namespace TSDParser.Tests;

public class Types
{
    [Fact]
    public void Boolean()
    {
        var tsd = """boolean""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<BooleanKeyword>();
    }

    [Fact]
    public void Number()
    {
        var tsd = """number""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void Any()
    {
        var tsd = """any""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<AnyKeyword>();
    }

    [Fact]
    public void Null()
    {
        var tsd = """null""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<NullKeyword>();
    }

    [Fact]
    public void Undefined()
    {
        var tsd = """undefined""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<UndefinedKeyword>();
    }

    [Fact]
    public void Class()
    {
        var tsd = """SomeClass""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("SomeClass");
    }

    [Fact]
    public void Void()
    {
        var tsd = """void""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void String()
    {
        var tsd = """string""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void Array()
    {
        var tsd = """string[]""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<ArrayType>();
        output.As<ArrayType>().ElementType.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void KeyValuePair()
    {
        var tsd = """{ [key: string]: number; }""";
        var output = TSDParser.Type.Parse(tsd);

        output.Should().BeOfType<TypeLiteral>();
        output.As<TypeLiteral>().Members[0].Should().BeOfType<IndexSignature>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Type.Should().BeOfType<NumberKeyword>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Parameters[0].Should().BeOfType<Parameter>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Parameters[0].As<Parameter>().Name.Text.Should().Be("key");
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Parameters[0].As<Parameter>().Type.Should().BeOfType<StringKeyword>();
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