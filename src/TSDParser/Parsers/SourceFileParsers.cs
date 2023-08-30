namespace TSDParser.Parsers
{
    internal class SourceFileParsers
    {
        public static Parser<SourceFile> SourceFile =
            from nodes in InterfaceParsers.InterfaceDeclaration
                .Or<Node>(ImportParsers.ImportDeclaration)
                .Or(ExportParsers.ExportDeclaration)
                .Many()
                .Optional()
            select new SourceFile()
            {
                Statements = new List<Node>(nodes.GetOrDefault())
            };
    }
}
