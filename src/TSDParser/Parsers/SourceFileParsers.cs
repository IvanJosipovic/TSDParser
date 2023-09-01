namespace TSDParser.Parsers;

internal class SourceFileParsers
{
    public static Parser<SourceFile> SourceFile =
        from nodes in
            InterfaceParsers.InterfaceDeclaration
            .Or<Node>(ClassParsers.ClassDeclaration)
            .Or<Node>(ImportParsers.ImportDeclaration)
            .Or<Node>(ExportParsers.ExportDeclaration)
            .Or<Node>(FunctionParsers.FunctionDeclaration)
            .Or<object>(Parse.LineEnd.Text())
            .Or<object>(CommonParsers.Comment())
            .Many()
            .Optional()
        select new SourceFile()
        {
            Statements = new List<Node>(nodes.GetOrDefault()?.Where(x => x is Node).Cast<Node>().ToList())
        };
}
