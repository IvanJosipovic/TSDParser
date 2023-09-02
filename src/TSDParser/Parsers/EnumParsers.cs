using TSDParser.Class;
using static System.Net.Mime.MediaTypeNames;

namespace TSDParser.Parsers;

internal class EnumParsers
{
    public static Parser<FirstLiteralToken> NumericValue =
        from value in Parse.Number
        select new FirstLiteralToken()
        {
            Text = value
        };

    public static Parser<StringLiteral> StringValue =
        from value in Parse.AnyChar.Many().Text().Contained(Parse.Chars("\"'"), Parse.Chars("\"'"))
        select new StringLiteral()
        {
            Text = value
        };

    /// <summary>
    /// Unknown = 0,
    /// </summary>
    public static Parser<EnumMember> EnumMember =
        from comment in CommonParsers.Comment().Optional()
        from name in CommonParsers.Name.Token()

        from @equals in Parse.Char('=').Token().Optional()
        from value in NumericValue.Or<Node>(StringValue).Where(x => @equals.IsDefined && x is not null)

        select new EnumMember()
        {
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null,

            Name = new Identifier
            {
                Text = name
            },
            Initializer = value
        };


    /// <summary>
    /// export declare const enum EnumName {}
    /// </summary>
    public static Parser<EnumDeclaration> EnumDeclaration =
        from comment in CommonParsers.Comment().Optional()
        from @export in Parse.String("export").Token().Optional()
        from @declare in Parse.String("declare").Token().Optional()
        from @const in Parse.String("const").Token().Optional()

        from keyword in Parse.String("enum").Token()

        from name in CommonParsers.Name.Token()

        from openBrace in Parse.Char('{').Token()

        from members in EnumMember.DelimitedBy(Parse.Char(','))

        from extra_comma in Parse.Char(',').Token().Optional()

        from closeBrace in Parse.Char('}').Token()

        select new EnumDeclaration()
        {
            Name = new Identifier
            {
                Text = name
            },
            Members = new List<EnumMember>(members),
            Modifiers = new List<Node>()
            {
                { @export.IsDefined ? new ExportKeyword() : null },
                { @declare.IsDefined ? new DeclareKeyword() : null },
                { @const.IsDefined ? new ConstKeyword() : null }
            }.Where(x => x is not null).ToList(),
            JSDoc = comment.IsDefined ? new JSDocComment() { Comment = comment.Get() } : null
        };
}
