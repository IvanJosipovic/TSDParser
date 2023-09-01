using System;
using System.Collections.Generic;
using System.Text;

namespace TSDParser.Class.Keywords;

internal class PrivateKeyword : Node
{
    public SyntaxKind Kind => SyntaxKind.PrivateKeyword;
}
