using TSDParser.Parsers.Types;

namespace TSDParser.Tests;

public class TypeTests
{
    [Fact]
    public void Boolean()
    {
        var tsd = """boolean""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<BooleanKeyword>();
        output.Kind.Should().Be(SyntaxKind.BooleanKeyword);
    }

    [Fact]
    public void Number()
    {
        var tsd = """number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<NumberKeyword>();
        output.Kind.Should().Be(SyntaxKind.NumberKeyword);
    }

    [Fact]
    public void Any()
    {
        var tsd = """any""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<AnyKeyword>();
        output.Kind.Should().Be(SyntaxKind.AnyKeyword);
    }

    [Fact]
    public void Null()
    {
        var tsd = """null""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<NullKeyword>();
        output.Kind.Should().Be(SyntaxKind.NullKeyword);
    }

    [Fact]
    public void Undefined()
    {
        var tsd = """undefined""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UndefinedKeyword>();
        output.Kind.Should().Be(SyntaxKind.UndefinedKeyword);
    }

    [Fact]
    public void Type()
    {
        var tsd = """Type""";
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
        output.Kind.Should().Be(SyntaxKind.VoidKeyword);
    }

    [Fact]
    public void String()
    {
        var tsd = """string""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<StringKeyword>();
        output.Kind.Should().Be(SyntaxKind.StringKeyword);
    }

    [Fact]
    public void Array()
    {
        var tsd = """string[]""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<ArrayType>();
        output.Kind.Should().Be(SyntaxKind.ArrayType);
        output.As<ArrayType>().ElementType.Should().BeOfType<StringKeyword>();
    }

    [Fact]
    public void KeyValuePair()
    {
        var tsd = """{ [key: string]: number; }""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeLiteral>();
        output.Kind.Should().Be(SyntaxKind.TypeLiteral);
        output.As<TypeLiteral>().Members[0].Should().BeOfType<IndexSignature>();
        output.As<TypeLiteral>().Members[0].As<IndexSignature>().Kind.Should().Be(SyntaxKind.IndexSignature);
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
        var tsd = """One<Two, Three>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("One");

        output.As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("Two");

        output.As<TypeReference>().TypeArguments[1].Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeArguments[1].As<TypeReference>().TypeName.Text.Should().Be("Three");
    }

    [Fact]
    public void GenericMultipleNoSpace()
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

    [Fact]
    public void GenericFunctionType()
    {
        var tsd = """Test<() => void>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("Test");

        output.As<TypeReference>().TypeArguments[0].Should().BeOfType<FunctionType>();
        output.As<TypeReference>().TypeArguments[0].As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void GenericParamFunctionType()
    {
        var tsd = """Test<(param: string) => void>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeReference>();
        output.As<TypeReference>().TypeName.Text.Should().Be("Test");

        output.As<TypeReference>().TypeArguments[0].Should().BeOfType<FunctionType>();
        output.As<TypeReference>().TypeArguments[0].As<FunctionType>().Parameters[0].Name.Text.Should().Be("param");
        output.As<TypeReference>().TypeArguments[0].As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
        output.As<TypeReference>().TypeArguments[0].As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    }

    [Fact]
    public void Union()
    {
        var tsd = """string | number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UnionType>();
        output.As<UnionType>().Kind.Should().Be(SyntaxKind.UnionType);
        output.As<UnionType>().Types[0].Should().BeOfType<StringKeyword>();
        output.As<UnionType>().Types[1].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void UnionGeneric()
    {
        var tsd = """Array<number> | number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UnionType>();
        output.As<UnionType>().Kind.Should().Be(SyntaxKind.UnionType);
        output.As<UnionType>().Types[0].Should().BeOfType<TypeReference>();
        output.As<UnionType>().Types[0].As<TypeReference>().TypeName.Text.Should().Be("Array");
        output.As<UnionType>().Types[0].As<TypeReference>().TypeArguments[0].Should().BeOfType<NumberKeyword>();
        output.As<UnionType>().Types[1].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void UnionMulti()
    {
        var tsd = """string | number | boolean""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UnionType>();
        output.As<UnionType>().Kind.Should().Be(SyntaxKind.UnionType);
        output.As<UnionType>().Types[0].Should().BeOfType<StringKeyword>();
        output.As<UnionType>().Types[1].Should().BeOfType<NumberKeyword>();
        output.As<UnionType>().Types[2].Should().BeOfType<BooleanKeyword>();
    }

    [Fact]
    public void UnionNoSpaces()
    {
        var tsd = """string|number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UnionType>();
        output.As<UnionType>().Types[0].Should().BeOfType<StringKeyword>();
        output.As<UnionType>().Types[1].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void Intersection()
    {
        var tsd = """string & number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<IntersectionType>();
        output.As<IntersectionType>().Kind.Should().Be(SyntaxKind.IntersectionType);
        output.As<IntersectionType>().Types[0].Should().BeOfType<StringKeyword>();
        output.As<IntersectionType>().Types[1].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void IntersectionGeneric()
    {
        var tsd = """Array<number> & number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<IntersectionType>();
        output.As<IntersectionType>().Kind.Should().Be(SyntaxKind.IntersectionType);
        output.As<IntersectionType>().Types[0].Should().BeOfType<TypeReference>();
        output.As<IntersectionType>().Types[0].As<TypeReference>().TypeName.Text.Should().Be("Array");
        output.As<IntersectionType>().Types[0].As<TypeReference>().TypeArguments[0].Should().BeOfType<NumberKeyword>();
        output.As<IntersectionType>().Types[1].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void IntersectionMulti()
    {
        var tsd = """string & number & boolean""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<IntersectionType>();
        output.As<IntersectionType>().Kind.Should().Be(SyntaxKind.IntersectionType);
        output.As<IntersectionType>().Types[0].Should().BeOfType<StringKeyword>();
        output.As<IntersectionType>().Types[1].Should().BeOfType<NumberKeyword>();
        output.As<IntersectionType>().Types[2].Should().BeOfType<BooleanKeyword>();
    }

    [Fact]
    public void IntersectionNoSpaces()
    {
        var tsd = """string&number""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<IntersectionType>();
        output.As<IntersectionType>().Types[0].Should().BeOfType<StringKeyword>();
        output.As<IntersectionType>().Types[1].Should().BeOfType<NumberKeyword>();
    }

    [Fact]
    public void TypeLiteral()
    {
        var tsd = """{ unload?: (isAsync?: boolean) => T; }""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeLiteral>();
        output.As<TypeLiteral>().Members[0].Should().BeOfType<PropertySignature>();
        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Name.Text.Should().Be("unload");
        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.Should().BeOfType<FunctionType>();

        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("isAsync");
        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Parameters[0].QuestionToken.Should().NotBeNull();
        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<BooleanKeyword>();

        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Type.Should().BeOfType<TypeReference>();
        output.As<TypeLiteral>().Members[0].As<PropertySignature>().Type.As<FunctionType>().Type.As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void UnionGenericMulti()
    {
        var tsd = """V | Type<V, T>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<UnionType>();
        output.As<UnionType>().Types[0].Should().BeOfType<TypeReference>();
        output.As<UnionType>().Types[0].As<TypeReference>().TypeName.Text.Should().Be("V");

        output.As<UnionType>().Types[1].Should().BeOfType<TypeReference>();
        output.As<UnionType>().Types[1].As<TypeReference>().TypeName.Text.Should().Be("Type");

        output.As<UnionType>().Types[1].As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.As<UnionType>().Types[1].As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("V");

        output.As<UnionType>().Types[1].As<TypeReference>().TypeArguments[1].Should().BeOfType<TypeReference>();
        output.As<UnionType>().Types[1].As<TypeReference>().TypeArguments[1].As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void IntersectionGenericMulti()
    {
        var tsd = """V & Type<V, T>""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<IntersectionType>();
        output.As<IntersectionType>().Types[0].Should().BeOfType<TypeReference>();
        output.As<IntersectionType>().Types[0].As<TypeReference>().TypeName.Text.Should().Be("V");

        output.As<IntersectionType>().Types[1].Should().BeOfType<TypeReference>();
        output.As<IntersectionType>().Types[1].As<TypeReference>().TypeName.Text.Should().Be("Type");

        output.As<IntersectionType>().Types[1].As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.As<IntersectionType>().Types[1].As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("V");

        output.As<IntersectionType>().Types[1].As<TypeReference>().TypeArguments[1].Should().BeOfType<TypeReference>();
        output.As<IntersectionType>().Types[1].As<TypeReference>().TypeArguments[1].As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void TypeOperator()
    {
        var tsd = """keyof T""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TypeOperator>();
        output.Kind.Should().Be(SyntaxKind.TypeOperator);

        output.As<TypeOperator>().Type.Should().BeOfType<TypeReference>();
        output.As<TypeOperator>().Type.As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void ConstructorType()
    {
        var tsd = """new () => T""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<ConstructorType>();
        output.Kind.Should().Be(SyntaxKind.ConstructorType);

        output.As<ConstructorType>().Type.Should().BeOfType<TypeReference>();
        output.As<ConstructorType>().Type.As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void ConstructorTypeParameter()
    {
        var tsd = """new (test: string) => T""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<ConstructorType>();
        output.Kind.Should().Be(SyntaxKind.ConstructorType);

        output.As<ConstructorType>().Parameters[0].Name.Text.Should().Be("test");
        output.As<ConstructorType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();

        output.As<ConstructorType>().Type.Should().BeOfType<TypeReference>();
        output.As<ConstructorType>().Type.As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    [Fact]
    public void IndexedAccessType()
    {
        var tsd = """V[T]""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<IndexedAccessType>();
        output.Kind.Should().Be(SyntaxKind.IndexedAccessType);

        output.As<IndexedAccessType>().ObjectType.Should().BeOfType<TypeReference>();
        output.As<IndexedAccessType>().ObjectType.As<TypeReference>().TypeName.Text.Should().Be("V");

        output.As<IndexedAccessType>().IndexType.Should().BeOfType<TypeReference>();
        output.As<IndexedAccessType>().IndexType.As<TypeReference>().TypeName.Text.Should().Be("T");
    }

    //[Fact]
    //public void MappedType()
    //{
    //    var tsd = """{ [key in keyof E]: E[keyof E];}""";
    //    var output = TypeParsers.Type.Parse(tsd);

    //    output.Should().BeOfType<MappedType>();
    //    output.As<MappedType>().TypeParameter.Name.Text.Should().Be("key");

    //    output.As<MappedType>().TypeParameter.Constraint.Should().BeOfType<TypeOperator>();
    //    output.As<MappedType>().TypeParameter.Constraint.As<TypeOperator>().Type.Should().BeOfType<TypeReference>();
    //    output.As<MappedType>().TypeParameter.Constraint.As<TypeOperator>().Type.As<TypeReference>().TypeName.Should().Be("E");

    //    output.As<MappedType>().Type.Should().BeOfType<IndexedAccessType>();
    //    output.As<MappedType>().Type.As<IndexedAccessType>().ObjectType.Should().BeOfType<TypeReference>();
    //    output.As<MappedType>().Type.As<IndexedAccessType>().ObjectType.As<TypeReference>().TypeName.Text.Should().Be("E");

    //    //output.As<MappedType>().Type.As<IndexedAccessType>().IndexType.Type.Should().BeOfType<TypeReference>();
    //    //output.As<MappedType>().Type.As<IndexedAccessType>().IndexType.Type.As<TypeReference>().TypeName.Text.Should().Be("E");
    //}

    [Fact]
    public void TupleType()
    {
        var tsd = """[E, V]""";
        var output = TypeParsers.Type.Parse(tsd);

        output.Should().BeOfType<TupleType>();
        output.Kind.Should().Be(SyntaxKind.TupleType);

        output.As<TupleType>().Elements[0].Should().BeOfType<TypeReference>();
        output.As<TupleType>().Elements[0].As<TypeReference>().TypeName.Text.Should().Be("E");

        output.As<TupleType>().Elements[1].Should().BeOfType<TypeReference>();
        output.As<TupleType>().Elements[1].As<TypeReference>().TypeName.Text.Should().Be("V");
    }
}