using TSDParser.Parsers;

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
}