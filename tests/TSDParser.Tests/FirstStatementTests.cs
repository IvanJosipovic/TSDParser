namespace TSDParser.Tests;

public class FirstStatementTests
{
    //[Fact]
    //public void Basic()
    //{
    //    var tsd = """
    //        /** Comment */
    //        export declare const variable: (values: string) => void;
    //        """;
    //    var output = FirstStatementParser.FirstStatement.Parse(tsd);

    //    output.Kind.Should().Be(SyntaxKind.FirstStatement);
    //    output.JSDoc.Comment.Should().Be("Comment");

    //    output.Modifiers[0].Should().BeOfType<ExportKeyword>();
    //    output.Modifiers[1].Should().BeOfType<DeclareKeyword>();

    //    output.DeclarationList.Kind.Should().Be(SyntaxKind.VariableDeclarationList);
    //    output.DeclarationList.Declarations[0].Name.Text.Should().Be("variable");
    //    output.DeclarationList.Declarations[0].Type.Should().BeOfType<FunctionType>();
    //    output.DeclarationList.Declarations[0].Type.As<FunctionType>().Parameters[0].Name.Text.Should().Be("values");
    //    output.DeclarationList.Declarations[0].Type.As<FunctionType>().Parameters[0].Type.Should().BeOfType<StringKeyword>();
    //    output.DeclarationList.Declarations[0].Type.As<FunctionType>().Type.Should().BeOfType<VoidKeyword>();
    //}

    //[Fact]
    //public void Generic()
    //{
    //    var tsd = """
    //        /** Comment */
    //        export declare const variable: <E>(values: string) => E;
    //        """;
    //    var output = FirstStatementParser.FirstStatement.Parse(tsd);

    //    output.Kind.Should().Be(SyntaxKind.FirstStatement);
    //    output.JSDoc.Comment.Should().Be("Comment");
    //}
}
