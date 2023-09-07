namespace TSDParser.Tests;

public class NamespaceExportDeclarationTests
{
    [Fact]
    public void Namespace()
    {
        var tsd = """
        /** Comment */
        export as namespace myLib;
        """;
        var output = NamespaceExportDeclarationParser.NamespaceExportDeclaration.Parse(tsd);

        output.Kind.Should().Be(SyntaxKind.NamespaceExportDeclaration);
        output.Name.Text.Should().Be("myLib");
        output.JSDoc.Comment.Should().Be("Comment");
    }
}
