using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class HeritageClause : Node
    {
        public SyntaxKind Kind => SyntaxKind.HeritageClause;
    }
}
