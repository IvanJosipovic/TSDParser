namespace TSDParser.Tests;

public class TypeAliasDeclarationTests
{
    [Fact]
    public void IntersectionNoSpaces()
    {
        var tsd = """
            /**
            * Comment Root
            */
            export declare type EnumValue<E = any> = EnumCls<E>;
            """;
        var output = TypeAliasParsers.TypeAliasDeclaration.Parse(tsd);

        output.Should().BeOfType<TypeAliasDeclaration>();
        output.Kind.Should().Be(SyntaxKind.TypeAliasDeclaration);

        output.Modifiers[0].Should().BeOfType<ExportKeyword>();
        output.Modifiers[1].Should().BeOfType<DeclareKeyword>();

        output.JSDoc.Comment.Should().Be("Comment Root");

        output.Name.Text.Should().Be("EnumValue");

        output.TypeParameters[0].Name.Text.Should().Be("E");
        output.TypeParameters[0].Default.Should().BeOfType<AnyKeyword>();

        output.Type.Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeName.Text.Should().Be("EnumCls");
        output.Type.As<TypeReference>().TypeArguments[0].Should().BeOfType<TypeReference>();
        output.Type.As<TypeReference>().TypeArguments[0].As<TypeReference>().TypeName.Text.Should().Be("E");

    }
}
